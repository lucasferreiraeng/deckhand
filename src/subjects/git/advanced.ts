import type { Question } from '../../types'

export const advanced: Question[] = [
  {
    id: 'git-a-01',
    prompt: 'You ran `git reset --hard HEAD~3` by mistake. How do you get the three commits back?',
    code: `git reset --hard HEAD~3
# HEAD is now at 64fc658 Add login form
git reflog -2
# 64fc658 HEAD@{0}: reset: moving to HEAD~3
# ae605d1 HEAD@{1}: commit: Add search page`,
    options: [
      '`git revert HEAD~3`',
      '`git reset --hard HEAD~1`',
      '`git reset --hard HEAD@{1}`',
      '`git restore --source=HEAD~3 .`',
    ],
    answer: 2,
    explanation:
      'The reflog records every position `HEAD` has held, even after a reset. `HEAD@{1}` is where it was just before the reset, so resetting to it restores the commits; `HEAD~1` would walk even further back in history.',
  },
  {
    id: 'git-a-02',
    prompt: 'You force-deleted a branch that had unmerged work. What brings it back?',
    code: `git branch -D feature
# Deleted branch feature (was a39a302).`,
    options: [
      '`git branch feature a39a302`',
      '`git revert a39a302`',
      '`git switch feature`',
      '`git stash pop`',
    ],
    answer: 0,
    explanation:
      'Deleting a branch only removes the ref, a name pointing at a commit; the commits themselves stay in the object database. Create a new branch at the old tip, taken from the message or from `git reflog`, before `git gc` eventually prunes them.',
  },
  {
    id: 'git-a-03',
    prompt: 'In an interactive rebase todo list, how do `squash` and `fixup` differ?',
    options: [
      '`squash` melds into the next commit, `fixup` into the previous',
      'Both meld into the previous commit; `fixup` drops its message',
      '`fixup` edits the commit in place without combining it',
      'Nothing, `fixup` is just an alias for `squash`',
    ],
    answer: 1,
    explanation:
      "Both fold a commit into the one on the line above it. `squash` opens the editor with both messages combined, while `fixup` silently keeps only the earlier commit's message.",
  },
  {
    id: 'git-a-04',
    prompt: 'What does this pair of commands do?',
    code: `git commit --fixup a1b2c3d
# [main e827d0c] fixup! Add login form
git rebase -i --autosquash a1b2c3d~1`,
    options: [
      'Amends `a1b2c3d` immediately, then rebases on top of it',
      'Replaces the message of `a1b2c3d` with `fixup!`',
      'Creates a branch named `fixup` and merges it back',
      'Records a fix, then the rebase melds it into `a1b2c3d`',
    ],
    answer: 3,
    explanation:
      '`--fixup` makes an ordinary commit titled `fixup! <subject>`. With `--autosquash`, the rebase moves it right below its target and marks it `fixup`, so it is folded in without reordering lines by hand.',
  },
  {
    id: 'git-a-05',
    prompt:
      'During an interactive rebase, which todo command stops after applying a commit so you can change its files?',
    options: ['`edit`', '`reword`', '`pick`', '`squash`'],
    answer: 0,
    explanation:
      '`edit` pauses with that commit applied: change files, run `git commit --amend`, then `git rebase --continue`. `reword` only opens the editor for the commit message.',
  },
  {
    id: 'git-a-06',
    prompt: '`git log main..feature` lists `F2` and `F1`. What does the three-dot version list?',
    code: `# main:    base - M1
# feature: base - F1 - F2
git log --format=%s main..feature
# F2
# F1
git log --format=%s main...feature`,
    options: [
      '`F2` and `F1`',
      '`M1` only',
      '`M1`, `F2` and `F1`',
      '`base`, `M1`, `F2` and `F1`',
    ],
    answer: 2,
    explanation:
      '`A..B` means "reachable from `B` but not from `A`". `A...B` is the symmetric difference, commits on either side but not on both, so `M1` joins the list. Add `--left-right` to see which side each came from.',
  },
  {
    id: 'git-a-07',
    prompt: 'What does the last command show?',
    code: `git status -sb
# ## main...origin/main [ahead 2]
git log --oneline @{u}..`,
    options: [
      'Commits on `origin/main` you have not pulled',
      'Your 2 local commits that are not pushed yet',
      'The 2 most recent reflog entries',
      'Every commit on the upstream branch',
    ],
    answer: 1,
    explanation:
      "`@{u}` is shorthand for the current branch's upstream, here `origin/main`. `@{u}..` means \"reachable from `HEAD` but not from the upstream\": exactly what you would push. Flip it to `..@{u}` to see fetched commits you haven't merged.",
  },
  {
    id: 'git-a-08',
    prompt: 'What do the two `git log` commands print?',
    code: `# history: one - two - three (HEAD)
git reset --hard HEAD~1
git log -1 --format=%s HEAD@{1}
git log -1 --format=%s HEAD~1`,
    options: [
      '`one`, then `three`',
      '`two`, then `one`',
      '`three`, then `two`',
      '`three`, then `one`',
    ],
    answer: 3,
    explanation:
      '`HEAD~1` walks the commit graph: the parent of the current commit `two`, which is `one`. `HEAD@{1}` walks the reflog: where `HEAD` was one move ago, before the reset, which is `three`.',
  },
  {
    id: 'git-a-09',
    prompt: 'What does this command do?',
    code: `# untracked: notes.txt, build/
# ignored:   debug.log
git clean -n`,
    options: [
      'Only prints `Would remove notes.txt`',
      'Deletes `notes.txt` and `build/`',
      'Prints all three paths as "would remove"',
      'Deletes all three without asking',
    ],
    answer: 0,
    explanation:
      '`-n` is a dry run, and by default `git clean` skips untracked directories (add `-d`) and ignored files (add `-x`). So `git clean -fdx` would really delete all three, which is why a dry run first is wise.',
  },
  {
    id: 'git-a-10',
    prompt:
      'You add a linting script as `.git/hooks/pre-commit`. What happens when a teammate clones the repo and commits?',
    options: [
      'The hook runs for them too',
      'Git asks them to approve the hook first',
      'Nothing: hooks are not part of the clone',
      'Their commit is blocked until they install it',
    ],
    answer: 2,
    explanation:
      "The `.git` directory isn't versioned, so hooks never travel with a clone or a push; a fresh clone only gets the `.sample` files. Teams usually commit hook scripts elsewhere and install them with a tool or `core.hooksPath`.",
  },
  {
    id: 'git-a-11',
    prompt: 'What state is the repository in right after this?',
    code: `git switch main
git merge --squash feature
# Squash commit -- not updating HEAD`,
    options: [
      'A merge commit with two parents was created',
      "`feature`'s changes are staged, but nothing is committed",
      'A single squashed commit was added to `main`',
      '`feature` was rebased onto `main`',
    ],
    answer: 1,
    explanation:
      '`--squash` applies the combined changes to the index and stops; you make the commit yourself. That commit has one parent and records no merge, so Git does not consider `feature` merged and `git branch -d feature` refuses.',
  },
  {
    id: 'git-a-12',
    prompt:
      'You just merged `feature` into `main`, have not pushed, and regret it. Which command undoes the merge?',
    options: [
      '`git reset --hard MERGE_HEAD`',
      '`git revert ORIG_HEAD`',
      '`git reset --hard FETCH_HEAD`',
      '`git reset --hard ORIG_HEAD`',
    ],
    answer: 3,
    explanation:
      'Commands that move `HEAD` drastically, such as `merge`, `rebase` and `reset`, save the previous position in `ORIG_HEAD`. `MERGE_HEAD` points at the commit being merged in, and only exists while a conflicted merge is in progress.',
  },
  {
    id: 'git-a-13',
    prompt: 'How does `git bisect run` decide whether each commit is good or bad?',
    code: `git bisect start HEAD v1.0
git bisect run npm test`,
    options: [
      'By the exit code: 0 is good, most non-zero codes are bad',
      'By searching the output for words like "fail"',
      'It asks you to confirm after every step',
      'By comparing test timings against `v1.0`',
    ],
    answer: 0,
    explanation:
      'Exit code 0 marks the commit good and 1–127 marks it bad, except 125, which means "can\'t test this one, skip it". Here `HEAD` is the bad end and `v1.0` the good one, and Git binary-searches between them.',
  },
  {
    id: 'git-a-14',
    prompt: 'What do the two `cat-file` commands print?',
    code: `git tag v1-light
git tag -a v1 -m "Release 1"
git cat-file -t v1-light
git cat-file -t v1`,
    options: [
      '`tag`, then `tag`',
      '`commit`, then `commit`',
      '`commit`, then `tag`',
      '`ref`, then `tag`',
    ],
    answer: 2,
    explanation:
      'A lightweight tag is just a ref pointing straight at a commit. `-a` creates an annotated tag: a real tag object holding the tagger, date and message, which in turn points at the commit.',
  },
  {
    id: 'git-a-15',
    prompt: 'The first line of this commit object is hidden. What is on it?',
    code: `git cat-file -p HEAD
# (hidden line)
# parent 6f08d51cc9d9e0dd742b3c76362ff1b707e6fc3b
# author Ana <ana@example.com> 1790699641 -0300
# committer Ana <ana@example.com> 1790699641 -0300`,
    options: [
      'The name of the branch it was made on',
      '`tree` plus the hash of the project snapshot',
      'A diff of the files that changed',
      'A list of the changed file names',
    ],
    answer: 1,
    explanation:
      'A commit stores a pointer to one tree (the full snapshot), its parent hashes, author, committer and message. It records no branch name and no diff; diffs are computed by comparing trees.',
  },
  {
    id: 'git-a-16',
    prompt:
      'You stage `a/x.txt` and `b/y.txt`, which have exactly the same content. How many blob objects does Git store for them?',
    options: [
      'Two, one per file path',
      'Two, but the second is stored as a delta',
      'None until you commit',
      'One, shared by both paths',
    ],
    answer: 3,
    explanation:
      '`git add` writes blobs right away, and blobs are content-addressed: the hash comes from the content alone, while names and paths live in tree objects. Identical content gives an identical hash, so it is stored once.',
  },
  {
    id: 'git-a-17',
    prompt: 'What does the second `cat` print?',
    code: `cat .git/HEAD
# ref: refs/heads/main
git switch --detach v1.0
cat .git/HEAD`,
    options: [
      'A raw commit hash',
      '`ref: refs/tags/v1.0`',
      '`ref: refs/heads/main`',
      '`ref: detached`',
    ],
    answer: 0,
    explanation:
      'Normally `HEAD` is a symbolic ref naming a branch, so new commits move that branch. Detached, it stores a commit hash directly and new commits belong to no branch. Plain `git switch v1.0` refuses, because a tag is not a branch.',
  },
  {
    id: 'git-a-18',
    prompt: 'Why did the second command fail?',
    code: `git worktree add ../hotfix hotfix
git worktree add ../main-copy main
# fatal: 'main' is already used by worktree at '/code/app'`,
    options: [
      'Worktrees must live inside the main folder',
      'A repository can only have one extra worktree',
      'A branch can be checked out in only one worktree',
      '`main` is protected from being checked out',
    ],
    answer: 2,
    explanation:
      "All worktrees share one repository, so a commit made in one copy of `main` would move the branch out from under the other. Use `--detach` or a new branch with `-b` if you need a second copy.",
  },
  {
    id: 'git-a-19',
    prompt: 'After cloning, `vendor/lib` is an empty folder. What fills it in?',
    code: `git clone https://example.com/app.git
cd app
git submodule status
# -942497d26ca2426eb46c65b057ee3b2a2f0ab2dd vendor/lib`,
    options: [
      '`git pull --all`',
      '`git submodule update --init`',
      '`git submodule add vendor/lib`',
      '`git fetch --recurse-submodules`',
    ],
    answer: 1,
    explanation:
      'The parent repo records only the submodule URL (in `.gitmodules`) and the exact commit to use. A plain clone leaves it uninitialized, shown by the leading `-`; `update --init` clones it and checks out that commit. `git clone --recurse-submodules` does both in one go.',
  },
  {
    id: 'git-a-20',
    prompt: 'Which commits does the last command list?',
    code: `# Add retries:    adds the line "retryCount = 3"
# Tweak retries:  changes it to "retryCount = 5"
# Remove retries: deletes the line
git log -S retryCount --format=%s`,
    options: [
      'All three commits',
      'Only `Add retries`',
      'Only `Tweak retries`',
      '`Remove retries` and `Add retries`',
    ],
    answer: 3,
    explanation:
      'The pickaxe `-S` finds commits that change how many times the string appears. The tweak removes one occurrence and adds another, so the count stays the same; `-G retryCount` matches any changed line containing it and would list all three.',
  },
  {
    id: 'git-a-21',
    prompt:
      'A Windows teammate has `core.autocrlf=true`. What line endings do they get in `.sh` files after checkout?',
    code: `echo '*.sh text eol=lf' >> .gitattributes
git add .gitattributes
git commit -m "Keep shell scripts on LF"`,
    options: [
      'LF, because the attribute overrides `core.autocrlf`',
      'CRLF, because `core.autocrlf` wins',
      'LF only if they also set `core.eol=lf`',
      'Git refuses to check the files out',
    ],
    answer: 0,
    explanation:
      "`.gitattributes` is committed, so its rules apply to everyone who clones. `eol=lf` forces LF in the working tree regardless of each person's `core.autocrlf`, which keeps shell scripts runnable.",
  },
  {
    id: 'git-a-22',
    prompt: 'What does `featureB` look like afterwards?',
    code: `# main:     base - M1
# featureA: base - A1 - A2
# featureB: base - A1 - A2 - B1 - B2
git rebase --onto main featureA featureB`,
    options: [
      '`base - M1 - A1 - A2 - B1 - B2`',
      '`base - A1 - A2 - M1 - B1 - B2`',
      '`base - M1 - B1 - B2`',
      '`base - M1 - A1 - A2`',
    ],
    answer: 2,
    explanation:
      'It takes the commits in `featureB` that are not in `featureA` (just `B1` and `B2`) and replays them on top of `main`. It is the classic way to move a branch off the branch it was started from.',
  },
  {
    id: 'git-a-23',
    prompt: 'How does `git merge -X ours feature` differ from `git merge -s ours feature`?',
    options: [
      'They are two spellings of the same thing',
      '`-X ours` only settles conflicts; `-s ours` drops all of `feature`',
      '`-s ours` only settles conflicts; `-X ours` drops all of `feature`',
      '`-X ours` keeps your version; `-s ours` keeps theirs',
    ],
    answer: 1,
    explanation:
      '`-X ours` is an option to the normal strategy: non-conflicting changes from `feature` still come in, and only conflicting hunks take your side. `-s ours` is a whole strategy that records a merge commit but leaves your tree untouched, discarding everything from `feature`.',
  },
  {
    id: 'git-a-24',
    prompt:
      'Which clone downloads every commit and tree but fetches file contents only when they are needed?',
    options: [
      '`git clone --depth 1 <url>`',
      '`git clone --single-branch <url>`',
      '`git clone --sparse <url>`',
      '`git clone --filter=blob:none <url>`',
    ],
    answer: 3,
    explanation:
      'That is a blobless partial clone: full history for `git log`, with old file versions downloaded on demand. `--depth 1` is a shallow clone that cuts history off instead, and sparse checkout only limits which files appear in the working tree.',
  },
]
