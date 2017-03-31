# Repository workflow
### Hint 
`$ (dev) git command` means that you should run `git command` on branch `dev`. `$ git blabla` means that you can run `git command` where you want.

### Create local repository
`$ git clone git@github.com:VEBB24/torus-front.git target_folder`

### Default config
Don't forget to change your default behavior for the `git pull`, because with this workflow, you can rebase on the common branch and then pull your own commits. 

`$ git config pull.rebase true`

### Switch working branch
`$ git checkout branch_name`

#### /!\ NEVER commit on branches `dev` or `master`, use a `feature` branch then merge it /!\

### Update your local branch
`$ (master) git pull --prune`

If you want to work on a modifed branch, after your checkout, git will tell you that you are behind origin, you will just have to pull this branch :

`$ (modifiedBranch) git pull`

### Create a branch
When you begin a new feature, checkout on dev and then create your feature branch with :

`$ (dev) git checkout -b feature/<feature_name>`

#### Example with feature/a
`$ (dev) git checkout -b feature/a`

*[...] Work on branch feature/a [...]*

`$ (feature/a) git add .`

`$ (feature/a) git commit -m "feature/a: reason of commit"`

You can replace `git add .` by `git add file1 file2` but the use of feature branches permit to omit this behaviour because the modified files will only be about your feature. After all your commits, when you finish or after a long session of code, always push your work to your branch :

`$ (dev) git push -u origin feature/a`

*(The `-u` option is needed only for the first push of the new branch)*

To be updated with each developers, always pull main branches :
`git pull dev`
`git pull master`
and then rebase your branch :

`$ (feature/a) git rebase dev && git pull`

When your feature is complete, merge it on dev to test it with other developers :

`$ (dev) git merge --no-ff feature/a`

*The use of `--no-ff` permit to have a clean history of commits even if files are not modified*

`$ (dev) git push`

### /!\ Always push working features on dev, you're not alone on this branch /!\
*If there are bugs on `dev` after your push, please resolve them quickly, revert if you can't, but don't leave `dev` buggy*

If debug is finished on branch `dev`, you can remove your `feature/<feature_name>` branch :

`$ (dev) git branch -d feature/a`

`$ (dev) git push origin :feature/a`

After everything is ready and working, you can then merge `dev` on `master` :

`$ (master) git merge --no-ff dev`

`$ (master) git push`

### Advanced
After many features and pushes, it's nice to create a stable branch of the application, you can make use of tags to create "backups" of working versions with :
`$ (master) git tag 1.X`

`$ (master) git checkout -b stable1.X`

`$ (stable1.X) git push -u origin stable1.X`

We will then be able to have version numbering for our application.

*Written by VIAU Thomas*