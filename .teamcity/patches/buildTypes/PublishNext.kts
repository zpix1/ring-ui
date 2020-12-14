package patches.buildTypes

import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.ScriptBuildStep
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2018_2.ui.*

/*
This patch script was generated by TeamCity on settings change in UI.
To apply the patch, change the buildType with id = 'PublishNext'
accordingly, and delete the patch script.
*/
changeBuildType(RelativeId("PublishNext")) {
    check(paused == true) {
        "Unexpected paused: '$paused'"
    }
    paused = false

    params {
        expect {
            param("vcs.branch.spec", "+:refs/heads/(develop-2.0)")
        }
        update {
            param("vcs.branch.spec", """
                +:refs/heads/(develop-4.0)
                -:refs/heads/master
            """.trimIndent())
        }
    }

    vcs {

        check(branchFilter == "-:<default>") {
            "Unexpected option value: branchFilter = $branchFilter"
        }
        branchFilter = "%vcs.branch.spec%"
    }

    expectSteps {
        script {
            name = "Publish"
            id = "RUNNER_1461"
            scriptContent = """
                #!/bin/bash
                set -e -x
                
                # Required for docker
                mkdir -p ~/.ssh/
                touch ~/.ssh/config
                cat << EOT >> ~/.ssh/config
                Host github.com
                    StrictHostKeyChecking no
                    UserKnownHostsFile /dev/null
                EOT
                
                chmod 644 ~/.ssh/config
                
                # GitHub and NPM authorization
                git config user.email "%github.com.builduser.email%"
                git config user.name "%github.com.builduser.name%"
                
                echo "//registry.npmjs.org/:_authToken=%npmjs.com.auth.key%" > ~/.npmrc
                
                node -v
                npm -v
                
                # Temporary until docker is not updated
                npm config set unsafe-perm true
                
                if [ -n "${'$'}(git status --porcelain)" ]; then
                  echo "Your git status is not clean. Aborting.";
                  exit 1;
                fi
                
                npm install
                npm run bootstrap
                # Reset possibly changed lock to avoid "git status is not clear" error
                git checkout package.json package-lock.json packages/*/package-lock.json
                npm run release-ci -- %lerna.publish.options%
                
                cat package.json
                
                function publishBuildNumber {
                    local VERSION=${'$'}(node -p 'require("./package.json").version')
                    echo "##teamcity[buildNumber '${'$'}VERSION']"
                }
                
                publishBuildNumber
                
                #chmod 777 ~/.ssh/config
            """.trimIndent()
            dockerImage = "node:10.15"
            dockerRunParameters = "-v %teamcity.build.workingDir%/npmlogs:/root/.npm/_logs"
        }
    }
    steps {
        update<ScriptBuildStep>(0) {
            id = "RUNNER_1461"
            clearConditions()
            dockerImage = "node:12"
        }
    }
}