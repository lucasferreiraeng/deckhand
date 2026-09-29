import type { Question } from '../../types'

export const beginner: Question[] = [
  {
    id: 'git-b-01',
    prompt: 'What is a commit in Git?',
    options: [
      'An upload of your changes to a server',
      'A saved snapshot of your project at a point in time',
      'A copy of a single file you marked as important',
      'A list of edits with no record of the full project',
    ],
    answer: 1,
    explanation:
      'A commit records the state of all tracked files at that moment, plus a message, an author and a link to the previous commit. Committing is purely local; sending commits to a server is a separate step (`git push`).',
  },
  {
    id: 'git-b-02',
    prompt: 'What does `git init` do when you run it in a folder?',
    options: [
      'Downloads a repository from a server',
      'Commits every file in the folder',
      'Creates a new, empty repository (a `.git` folder)',
      'Connects the folder to a remote named `origin`',
    ],
    answer: 2,
    explanation:
      '`git init` creates a hidden `.git` folder where Git keeps all the history and settings. Nothing is tracked or committed yet: you still need `git add` and `git commit`.',
  },
  {
    id: 'git-b-03',
    prompt: 'What do you get after running `git clone <url>`?',
    options: [
      'A new folder with the files and the full history',
      'Only the latest files, without any history',
      'An empty repository linked to the URL',
      'The files, with no link back to the original',
    ],
    answer: 0,
    explanation:
      '`git clone` copies the whole repository, including every commit, into a new folder and checks out the default branch. It also remembers where it came from as a remote called `origin`.',
  },
  {
    id: 'git-b-04',
    prompt: 'You edited `app.js` and ran `git add app.js`. Where are those changes now?',
    options: [
      'In a new commit in the repository',
      'On the remote server',
      'Only in the working tree; `add` just tracks the name',
      'In the staging area, ready for the next commit',
    ],
    answer: 3,
    explanation:
      'Git has three places: the working tree (your files), the staging area or index (what the next commit will contain) and the repository (saved commits). `git add` copies changes into the staging area; `git commit` turns the staging area into a commit.',
  },
  {
    id: 'git-b-05',
    prompt: 'How does `git status` list `notes.txt` here?',
    code: `git init
echo "hello" > notes.txt
git status`,
    options: [
      'Under "Untracked files"',
      'Under "Changes to be committed"',
      'Under "Changes not staged for commit"',
      'It is not listed until you commit',
    ],
    answer: 0,
    explanation:
      'Untracked means Git sees the file but has never been told to keep track of it. Running `git add notes.txt` stages it, and from then on Git follows its changes.',
  },
  {
    id: 'git-b-06',
    prompt: 'In which section of `git status` does `app.js` appear?',
    code: `git add app.js
git commit -m "Add app"
echo "// todo" >> app.js
git status`,
    options: [
      'Untracked files',
      'Changes to be committed',
      'Changes not staged for commit (modified)',
      "None; Git ignores it until you run `git add`",
    ],
    answer: 2,
    explanation:
      'Git already tracks `app.js` because it was committed, so it notices the file differs from the last commit and marks it `modified`. "Untracked" is only for files Git has never been told about. The new change is not staged yet, so a commit right now would not include it.',
  },
  {
    id: 'git-b-07',
    prompt: 'What does `-m` do in `git commit -m "Fix login bug"`?',
    options: [
      'Commits only modified files and skips new ones',
      'Gives the commit message inline, so no editor opens',
      'Merges the staged changes into `main`',
      'Marks the commit as the main version',
    ],
    answer: 1,
    explanation:
      'Every commit needs a message. Without `-m`, Git opens your text editor so you can write one; with `-m` you pass it straight on the command line.',
  },
  {
    id: 'git-b-08',
    prompt: 'Where does `notes.txt` appear in `git status`?',
    code: `echo "v1" > notes.txt
git add notes.txt
echo "v2" >> notes.txt
git status`,
    options: [
      'Only under "Changes to be committed"',
      'Only under "Changes not staged for commit"',
      'Under "Untracked files"',
      'Under both "to be committed" and "not staged"',
    ],
    answer: 3,
    explanation:
      '`git add` stages the file as it was at that moment. The later edit is not staged, so the file shows up in both sections, and committing now would save only the "v1" line. Run `git add` again to stage the newer version.',
  },
  {
    id: 'git-b-09',
    prompt: 'You edited `app.js`, then ran these commands. Why does `git diff` print nothing?',
    code: `git add app.js
git diff`,
    options: [
      'It compares the files to the staging area, and they match',
      'It only shows changes after you commit',
      'Staged changes stay hidden until you push',
      'It needs a commit hash to show anything',
    ],
    answer: 0,
    explanation:
      'Plain `git diff` shows changes you have not staged yet. Once everything is staged, there is nothing left to show; use `git diff --staged` to see what is in the staging area.',
  },
  {
    id: 'git-b-10',
    prompt: 'Which command shows the changes that will go into your next commit?',
    options: ['`git diff`', '`git show`', '`git diff --staged`', '`git log -p`'],
    answer: 2,
    explanation:
      '`git diff --staged` (also spelled `--cached`) compares the staging area with the last commit, which is exactly what `git commit` would save. `git show` and `git log -p` show commits that already exist.',
  },
  {
    id: 'git-b-11',
    prompt: 'Which of these commits is the most recent?',
    code: `git log --oneline
# 2683a08 Add settings page
# bb3000a Rename app.js to main.js
# 35cc65e Add app`,
    options: [
      '`35cc65e Add app`',
      '`2683a08 Add settings page`',
      "You can't tell; `--oneline` sorts by hash",
      "You can't tell without the dates",
    ],
    answer: 1,
    explanation:
      '`git log` lists commits newest first. `--oneline` squeezes each commit into one line: a short hash plus the first line of its message.',
  },
  {
    id: 'git-b-12',
    prompt: 'Commit hashes are long, but a teammate only gave you `2683a08`. Why does Git accept it?',
    options: [
      'The short form is a separate, shorter ID',
      'Git only stores the first 7 characters',
      'Short hashes only work for the latest commit',
      'Git accepts any prefix that matches just one object',
    ],
    answer: 3,
    explanation:
      'Each commit is identified by a hash computed from its contents. You can use just the start of it, as long as no other object in the repository starts the same way.',
  },
  {
    id: 'git-b-13',
    prompt: 'What do these commands affect?',
    code: `git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"`,
    options: [
      'The author on your future commits, in all your repos',
      'Your login for pushing to GitHub',
      'Only the repository you are currently in',
      'All existing commits, which get a new author',
    ],
    answer: 0,
    explanation:
      'Git writes this name and email into every new commit you make. `--global` saves them for your user account; run the same command without `--global` inside a repo to override them just there. It is not a login and never changes old commits.',
  },
  {
    id: 'git-b-14',
    prompt: 'Which files does this `.gitignore` ignore?',
    code: `# .gitignore
*.log`,
    options: [
      'Only `.log` files in the root folder',
      'Only a file literally named `*.log`',
      '`.log` files in any folder of the project',
      'All files inside a folder named `log`',
    ],
    answer: 2,
    explanation:
      'A pattern without a slash matches at any depth, so `debug.log` and `logs/deep/app.log` are both ignored. Start the pattern with `/` (like `/debug.log`) to match only in the folder that holds the `.gitignore`.',
  },
  {
    id: 'git-b-15',
    prompt: 'What does `git status` show for `secret.env`?',
    code: `# secret.env was committed last week
echo "secret.env" >> .gitignore
echo "KEY=new" > secret.env
git status`,
    options: [
      "Nothing; it's ignored now",
      '`modified: secret.env`',
      '`deleted: secret.env`',
      'It moves to "Untracked files"',
    ],
    answer: 1,
    explanation:
      '`.gitignore` only affects files Git is not tracking yet. To stop tracking a committed file, run `git rm --cached secret.env` and commit; the file stays on your disk, but it remains in the old commits.',
  },
  {
    id: 'git-b-16',
    prompt: 'What does `HEAD` usually point to?',
    options: [
      'The first commit in the repository',
      'The newest commit on the remote',
      'Always the `main` branch',
      'The branch you currently have checked out',
    ],
    answer: 3,
    explanation:
      '`HEAD` means "where you are now". It normally points to your current branch, which points to that branch\'s latest commit. When you commit, the branch moves forward and `HEAD` comes along.',
  },
  {
    id: 'git-b-17',
    prompt: 'You start on `main` and run these commands. Which branch are you on?',
    code: `git branch feature
git status`,
    options: [
      '`main`',
      '`feature`',
      'None; `HEAD` is detached',
      '`feature`, but only after your next commit',
    ],
    answer: 0,
    explanation:
      '`git branch feature` only creates the branch; it does not move you there. Use `git switch feature` to go to it, or `git switch -c feature` to create and switch in one step.',
  },
  {
    id: 'git-b-18',
    prompt: 'Which command does the same thing as `git checkout -b login`?',
    options: ['`git switch login`', '`git branch -c login`', '`git switch -c login`', '`git checkout login`'],
    answer: 2,
    explanation:
      'Both create a new branch at your current commit and switch to it. `git switch` was added to Git as a clearer, branch-only alternative to the do-everything `git checkout`.',
  },
  {
    id: 'git-b-19',
    prompt: 'You edited `app.js` (not staged) and want to throw those edits away. Which command?',
    options: [
      '`git restore --staged app.js`',
      '`git restore app.js`',
      '`git rm app.js`',
      '`git reset app.js`',
    ],
    answer: 1,
    explanation:
      '`git restore <file>` overwrites the file with the version in the staging area, discarding your unstaged edits. Be careful: those edits were never committed, so Git cannot bring them back.',
  },
  {
    id: 'git-b-20',
    prompt: 'What happens to your edits in `app.js`?',
    code: `git add app.js
git restore --staged app.js
git status --short`,
    options: [
      'They stay in the file, just no longer staged',
      'They are deleted from the file',
      'They are committed',
      'The file becomes untracked',
    ],
    answer: 0,
    explanation:
      '`--staged` only touches the staging area: it unstages the file and leaves your working copy alone. `git status --short` lists `app.js` with an `M` in the second column, meaning modified but not staged.',
  },
  {
    id: 'git-b-21',
    prompt: 'What is the difference between `git rm notes.txt` and `git rm --cached notes.txt`?',
    options: [
      '`--cached` removes it only from the remote',
      '`--cached` deletes the file but keeps it tracked',
      'None; `--cached` only skips a confirmation',
      '`--cached` stops tracking it but keeps the file on disk',
    ],
    answer: 3,
    explanation:
      'Both stage the removal, so the next commit no longer contains the file. Plain `git rm` also deletes it from your folder, while `--cached` leaves it there as an untracked file.',
  },
  {
    id: 'git-b-22',
    prompt: 'What does `git status` show after this?',
    code: `git mv app.js main.js
git status`,
    options: [
      '`deleted: app.js` plus an untracked `main.js`',
      '`renamed: app.js -> main.js`, staged',
      "Nothing; Git doesn't track renames",
      '`renamed: app.js -> main.js`, not staged',
    ],
    answer: 1,
    explanation:
      '`git mv` renames the file and stages the change in one go, like running `mv` followed by `git add` on both names. The rename goes into your next commit.',
  },
  {
    id: 'git-b-23',
    prompt: 'In `git push origin main`, what are `origin` and `main`?',
    options: [
      'The branch to push, then the remote name',
      'The server URL, then your username',
      'The remote name, then the branch to push',
      'The first commit, then the latest commit',
    ],
    answer: 2,
    explanation:
      '`origin` is a short nickname for a remote repository\'s URL; `git clone` creates it for you. `main` is the branch whose commits you are sending.',
  },
  {
    id: 'git-b-24',
    prompt: 'Your push was rejected. What should you do?',
    code: `git push
# ! [rejected]  main -> main (fetch first)
# hint: Updates were rejected because the remote
# hint: contains work that you do not have locally.`,
    options: [
      'Pull the new commits into your branch, then push again',
      'Delete your local commits and clone again',
      'Run `git push` again until it goes through',
      'Make another commit so your branch is newer',
    ],
    answer: 0,
    explanation:
      'Someone pushed commits you don\'t have yet, and Git refuses to overwrite them. Pulling downloads their work and combines it with yours by merging or rebasing (Git may ask you to pick one, e.g. `git pull --rebase`), and then your push can succeed.',
  },
]
