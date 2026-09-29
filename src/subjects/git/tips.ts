import type { Tip } from '../../types'

export const tips: Tip[] = [
  {
    id: 'git-tip-01',
    kind: 'tip',
    title: 'Jump back with `git switch -`',
    body: 'Like `cd -` in the shell, `git switch -` returns to the branch you were on before. The `-` is shorthand for `@{-1}`, the previously checked-out branch.',
    code: `git switch feature
git switch main
git switch -
# Switched to branch 'feature'`,
  },
  {
    id: 'git-tip-02',
    kind: 'curiosity',
    title: 'Git was born in 2005',
    body: 'Linus Torvalds wrote Git in April 2005, after the free BitKeeper licence used by Linux kernel developers was withdrawn. Within weeks it was hosting the kernel itself.',
  },
  {
    id: 'git-tip-03',
    kind: 'gotcha',
    title: '`.gitignore` won’t untrack files',
    body: 'Ignore rules only apply to untracked files, so a file that is already committed keeps being tracked. Remove it from the index with `git rm --cached`; it stays on disk, and in old commits.',
    code: `echo "*.env" >> .gitignore
git rm --cached secret.env
git commit -m "Stop tracking secret.env"`,
  },
  {
    id: 'git-tip-04',
    kind: 'tip',
    title: 'Alias a pretty history view',
    body: '`git log --oneline --graph --all` draws every branch as a compact graph. Save it as an alias so you never have to type it again.',
    code: `git config --global alias.lg "log --oneline --graph --all"
git lg`,
  },
  {
    id: 'git-tip-05',
    kind: 'curiosity',
    title: '"git" is British slang',
    body: 'In British English a "git" is an unpleasant or foolish person. Linus joked that he names all his projects after himself: first Linux, then Git.',
  },
  {
    id: 'git-tip-06',
    kind: 'tip',
    title: 'Stage only part of a file',
    body: '`git add -p` walks through your changes hunk by hunk, so one messy file can become several focused commits. Press `y` to stage, `n` to skip, `s` to split a hunk and `e` to edit it.',
    code: `git add -p
# (1/1) Stage this hunk [y,n,q,a,d,s,e,p,P,?]?
git diff --staged`,
  },
  {
    id: 'git-tip-07',
    kind: 'gotcha',
    title: '`git stash` leaves new files behind',
    body: 'By default `git stash` saves only changes to tracked files; brand-new untracked files stay in your working directory. Add `-u` (`--include-untracked`) to stash them too.',
    code: `git stash      # new.txt stays behind
git stash -u   # new.txt is stashed too`,
  },
  {
    id: 'git-tip-08',
    kind: 'curiosity',
    title: 'Git stores snapshots, not diffs',
    body: 'Each commit points to a full tree of the project, and unchanged files simply reuse the same objects. Diffs are computed on demand; only packfiles delta-compress objects behind the scenes to save space.',
  },
  {
    id: 'git-tip-09',
    kind: 'tip',
    title: 'Fix an old commit with `--fixup`',
    body: 'Commit the correction with `--fixup <hash>`, then run an autosquash rebase. Git moves the fix right under its target and marks it `fixup`, so you only need to save the todo list.',
    code: `git commit --fixup a1b2c3d
# [main e827d0c] fixup! Add login form
git rebase -i --autosquash a1b2c3d~1`,
  },
  {
    id: 'git-tip-10',
    kind: 'curiosity',
    title: 'One maintainer since 2005',
    body: 'Linus handed Git over to Junio Hamano in July 2005, just months after writing it. Junio has been the project’s maintainer ever since.',
  },
  {
    id: 'git-tip-11',
    kind: 'gotcha',
    title: '`reset --hard` has no undo for edits',
    body: 'The reflog can bring back commits, but uncommitted changes were never in a commit. `git reset --hard` overwrites them with no reflog entry to return to, so commit or stash first if in doubt.',
  },
  {
    id: 'git-tip-12',
    kind: 'tip',
    title: 'Force-push safely with a lease',
    body: '`--force-with-lease` refuses to push if the remote branch moved since you last fetched, so you don’t wipe a teammate’s commits. Careful: a `git fetch` refreshes the lease, so check what came in before pushing.',
    code: `git push --force-with-lease
# ! [rejected]  main -> main (stale info)`,
  },
  {
    id: 'git-tip-13',
    kind: 'curiosity',
    title: 'A blob’s ID is just a hash',
    body: 'A blob’s name is the SHA-1 of a small header (`blob`, the size, a null byte) followed by the content. Same content, same ID, on any machine.',
    code: `echo hello | git hash-object --stdin
# ce013625030ba8dba906f756967f9e9ca394464a
printf 'blob 6\\0hello\\n' | sha1sum
# ce013625030ba8dba906f756967f9e9ca394464a  -`,
  },
  {
    id: 'git-tip-14',
    kind: 'tip',
    title: 'See changed words, not lines',
    body: '`git diff --word-diff` marks the exact words that changed inside a line. It is great for prose, docs and long config lines.',
    code: `git diff --word-diff
# The quick [-brown-]{+red+} fox`,
  },
  {
    id: 'git-tip-15',
    kind: 'gotcha',
    title: 'Detached HEAD commits can get lost',
    body: 'Commits made on a detached `HEAD` belong to no branch. Once you switch away, only the reflog remembers them, and its entries eventually expire, so create a branch first with `git switch -c`.',
  },
  {
    id: 'git-tip-16',
    kind: 'curiosity',
    title: 'GitHub is not Git',
    body: 'Git is the open-source version control tool; GitHub is a hosting service built around it, launched in 2008. Microsoft bought GitHub in 2018, while Git remains an independent project.',
  },
  {
    id: 'git-tip-17',
    kind: 'tip',
    title: 'Work on two branches at once',
    body: '`git worktree add` checks out another branch in a separate folder that shares the same repository. Fix a hotfix without stashing or disturbing your current work.',
    code: `git worktree add ../hotfix hotfix
git worktree list
git worktree remove ../hotfix`,
  },
  {
    id: 'git-tip-18',
    kind: 'gotcha',
    title: '`git checkout <file>` discards edits',
    body: '`git checkout -- app.js` overwrites your uncommitted edits to that file with the staged version, without asking. Those edits were never committed, so there is nothing to recover.',
  },
  {
    id: 'git-tip-19',
    kind: 'curiosity',
    title: 'SHA-1 today, SHA-256 tomorrow',
    body: 'Git names objects by SHA-1 hashes, 40 hex characters long. Git 2.29 made SHA-256 repositories possible with `git init --object-format=sha256`, and Git 3.0 plans to make it the default for new repositories.',
  },
  {
    id: 'git-tip-20',
    kind: 'tip',
    title: 'Undo file changes with `git restore`',
    body: 'Git 2.23 added `git restore` (and `git switch`) to split up the overloaded `git checkout`. Discard working-tree edits, or just unstage a file with `--staged`.',
    code: `git restore app.js           # discard unstaged edits
git restore --staged app.js  # unstage, keep edits`,
  },
  {
    id: 'git-tip-21',
    kind: 'gotcha',
    title: '`git pull` can add surprise merges',
    body: 'When your branch and the remote have diverged, a merging pull creates a "Merge branch \'main\' of …" commit. Modern Git stops and asks you to choose unless `pull.rebase` or `pull.ff` is set; `pull.rebase true` replays your commits on top instead.',
    code: `git config --global pull.rebase true
# or per pull: git pull --rebase`,
  },
  {
    id: 'git-tip-22',
    kind: 'curiosity',
    title: 'The first branch name is a setting',
    body: 'Git 2.28 added `init.defaultBranch` to choose the first branch name in new repositories. The built-in default is still `master`, but Git 3.0 plans to switch it to `main`.',
  },
  {
    id: 'git-tip-23',
    kind: 'tip',
    title: 'Let Git remember conflict fixes',
    body: 'With `rerere` ("reuse recorded resolution") on, Git records how you resolve each conflict. When the same conflict shows up again, say in a repeated rebase, it reapplies your fix; you just review and `git add`.',
    code: `git config --global rerere.enabled true
# Resolved 'app.js' using previous resolution.`,
  },
  {
    id: 'git-tip-24',
    kind: 'gotcha',
    title: 'Git doesn’t track empty folders',
    body: 'Git tracks files, not directories, so an empty folder never shows up in `git status` or in a commit. The usual workaround is a placeholder file such as `.gitkeep`, a convention rather than a Git feature.',
  },
]
