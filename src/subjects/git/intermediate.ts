import type { Question } from '../../types'

export const intermediate: Question[] = [
  {
    id: 'git-i-01',
    prompt: '`main` had no new commits since `feature` branched off. What did this merge do?',
    code: `git switch main
git merge feature
# Updating c912c55..8ce245a
# Fast-forward`,
    options: [
      'Created a merge commit with two parents',
      "Copied `feature`'s commits with new hashes",
      "Moved `main` forward to `feature`'s latest commit",
      'Merged, then deleted the `feature` branch',
    ],
    answer: 2,
    explanation:
      'When the branch you are on is an ancestor of the one you merge, there is nothing to combine, so Git just slides the pointer forward. No new commit is created; pass `--no-ff` if you want a merge commit anyway.',
  },
  {
    id: 'git-i-02',
    prompt: 'What kind of merge does this history show?',
    code: `git log --oneline --graph
# *   b11ec38 Merge branch 'login'
# |\\
# | * 8b2adfc Add login
# * | 742369d Update readme
# |/
# * 8ce245a Add x`,
    options: [
      'A three-way merge that created a merge commit',
      'A fast-forward merge',
      'A rebase of `login` onto `main`',
      'A merge whose conflict is still unresolved',
    ],
    answer: 0,
    explanation:
      'Both branches had new commits, so Git combined them using their common ancestor (`8ce245a`) and the two branch tips. The result is a merge commit with two parents, which `--graph` draws as two lines joining.',
  },
  {
    id: 'git-i-03',
    prompt: 'You are on `main` and the merge stopped with a conflict. Which line is `main`\'s version?',
    code: `git merge theme
cat config.txt
# <<<<<<< HEAD
# color = red
# =======
# color = green
# >>>>>>> theme`,
    options: [
      '`color = green`',
      '`color = red`',
      'Neither; both come from the common ancestor',
      'Whichever was committed most recently',
    ],
    answer: 1,
    explanation:
      'The part between `<<<<<<< HEAD` and `=======` is your current branch; the part below it is the branch coming in. Edit the file to the version you want, delete the markers, then `git add config.txt` and `git commit` to finish the merge.',
  },
  {
    id: 'git-i-04',
    prompt: 'A merge produced conflicts in 12 files and you want to back out completely. What do you run?',
    options: ['`git restore .`', '`git revert HEAD`', '`git stash`', '`git merge --abort`'],
    answer: 3,
    explanation:
      '`git merge --abort` cancels the merge in progress and puts your branch and files back the way they were before you started. Starting merges with a clean working tree makes this reliable.',
  },
  {
    id: 'git-i-05',
    prompt: 'What is the difference between `git fetch` and `git pull`?',
    options: [
      '`fetch` only downloads; `pull` also updates your branch',
      '`fetch` downloads one branch; `pull` downloads all',
      '`pull` only downloads; `fetch` also merges',
      "`fetch` needs a clean working tree; `pull` doesn't",
    ],
    answer: 0,
    explanation:
      '`git fetch` downloads new commits and updates remote-tracking branches like `origin/main`, without touching your branches or files. `git pull` is a fetch followed by a merge or rebase into your current branch.',
  },
  {
    id: 'git-i-06',
    prompt: 'What is `origin/main` in this output?',
    code: `git fetch
git status
# Your branch and 'origin/main' have diverged,
# and have 1 and 1 different commits each, respectively.`,
    options: [
      'A live view of the remote that updates by itself',
      'A second local branch you commit to directly',
      "Your local record of the remote's `main` at the last fetch",
      "The remote's default branch setting",
    ],
    answer: 2,
    explanation:
      '`origin/main` is a remote-tracking branch: a read-only bookmark of where `main` was on `origin` the last time you talked to it. It moves when you `fetch`, `pull` or `push`, never by itself, which is why you fetch before comparing.',
  },
  {
    id: 'git-i-07',
    prompt: 'Which command fixes this and lets plain `git push` work from now on?',
    code: `git switch -c feature
git push
# fatal: The current branch feature has no upstream branch.`,
    options: [
      '`git push --force`',
      '`git push -u origin feature`',
      '`git remote add origin feature`',
      '`git fetch origin feature`',
    ],
    answer: 1,
    explanation:
      '`-u` (short for `--set-upstream`) pushes the branch and records `origin/feature` as its upstream. After that, `git push`, `git pull` and `git status` know which remote branch to work with.',
  },
  {
    id: 'git-i-08',
    prompt: 'You have 2 unpushed commits and `origin/main` has 3 new ones. What does `git pull --rebase` do?',
    options: [
      'Creates a merge commit joining both histories',
      "Discards your 2 commits and takes the remote's",
      'Pushes your 2 commits, then downloads the 3',
      'Replays your 2 commits on top of the 3 new ones',
    ],
    answer: 3,
    explanation:
      'It fetches, then rebases your local commits onto the updated `origin/main`, giving a straight line of history with no merge commit. Your 2 commits get new hashes, which is fine because nobody else has them yet.',
  },
  {
    id: 'git-i-09',
    prompt: 'What does `feature` look like after this rebase?',
    code: `# main:    A - B - C
# feature: A - D - E
git switch feature
git rebase main`,
    options: [
      "`A - B - C - D' - E'` (D and E are new commits)",
      '`A - D - E - B - C`',
      '`A - B - C` plus a merge commit',
      '`A - D - E`, and `main` now includes them',
    ],
    answer: 0,
    explanation:
      'Rebase replays your commits one by one on top of the new base. The changes are the same, but they become new commits with new hashes, and merging `feature` into `main` afterwards is a fast-forward.',
  },
  {
    id: 'git-i-10',
    prompt: 'When is `git rebase` risky?',
    options: [
      "When rebasing local commits you haven't pushed",
      'When the branch has more than 10 commits',
      'When the commits are already pushed and shared',
      'When the rebase finishes with no conflicts',
    ],
    answer: 2,
    explanation:
      'Rebasing replaces commits with new copies. If teammates already built on the old ones, their history no longer matches yours and you would have to force-push, so the golden rule is: only rebase commits that are still private.',
  },
  {
    id: 'git-i-11',
    prompt: 'What does `git status --short` show after the stash?',
    code: `# app.js is modified; draft.txt is new and untracked
git stash
git status --short`,
    options: [
      'Nothing; the working tree is clean',
      'Only `draft.txt`, still untracked',
      'Only `app.js`, still modified',
      'Both files, unchanged',
    ],
    answer: 1,
    explanation:
      'By default `git stash` only saves changes to tracked files, so untracked files stay where they are. Use `git stash -u` (`--include-untracked`) to stash them too.',
  },
  {
    id: 'git-i-12',
    prompt: 'How does `git stash pop` differ from `git stash apply`?',
    options: [
      '`pop` also removes the stash from the list',
      '`apply` also removes the stash from the list',
      '`pop` applies the oldest stash; `apply` the newest',
      '`pop` discards the changes; `apply` restores them',
    ],
    answer: 0,
    explanation:
      'Both reapply the most recent stash to your files. `pop` then drops it from the stash list, while `apply` keeps it so you can reuse it. If `pop` hits a conflict, Git keeps the stash so nothing is lost.',
  },
  {
    id: 'git-i-13',
    prompt: 'What does the history look like after these commands?',
    code: `git commit -m "Add login form"
# oops, forgot a file
git add test.txt
git commit --amend --no-edit`,
    options: [
      'Two commits: the original and a fix-up',
      'The same commit hash, now with `test.txt`',
      'A merge of the two commits',
      'One "Add login form" commit that includes `test.txt`',
    ],
    answer: 3,
    explanation:
      '`--amend` replaces the last commit with a new one (new hash) that includes whatever is staged; `--no-edit` keeps the message. Because it rewrites a commit, avoid amending commits you have already pushed.',
  },
  {
    id: 'git-i-14',
    prompt: 'What happens to the changes from "Add login form"?',
    code: `git log --oneline
# ce668f1 Add login form
# fd83dd4 First
git reset --soft HEAD~1`,
    options: [
      'They are in the files but unstaged',
      'They are gone',
      'They are still staged, ready to commit again',
      'They are moved into a stash',
    ],
    answer: 2,
    explanation:
      '`--soft` only moves the branch back one commit; the staging area and your files are untouched. It is handy for redoing a commit, for example to change what goes into it.',
  },
  {
    id: 'git-i-15',
    prompt: 'Which `git reset` mode keeps your changes in the files but unstages them? (It is also the default.)',
    options: ['`--soft`', '`--mixed`', '`--hard`', '`--staged`'],
    answer: 1,
    explanation:
      'With no mode, `git reset HEAD~1` uses `--mixed`: it moves the branch and resets the staging area, but leaves your files alone. `--hard` also overwrites your files, throwing away uncommitted work.',
  },
  {
    id: 'git-i-16',
    prompt: 'A bad commit is already on the shared `main`, and teammates have pulled it. What is the safe way to undo it?',
    options: [
      '`git revert <hash>`',
      '`git reset --hard HEAD~1`, then `git push --force`',
      '`git commit --amend`',
      '`git reset --soft HEAD~1`',
    ],
    answer: 0,
    explanation:
      '`git revert` adds a new commit that does the opposite of the bad one, so history only moves forward and everyone can pull it normally. `reset` and `--amend` rewrite history that others already have.',
  },
  {
    id: 'git-i-17',
    prompt: 'You need one bug-fix commit from `feature` on `main`, but not the rest of `feature`. What do you run on `main`?',
    options: [
      '`git merge feature`',
      '`git rebase feature`',
      '`git revert <hash>`',
      '`git cherry-pick <hash>`',
    ],
    answer: 3,
    explanation:
      '`git cherry-pick` takes the changes from one commit and applies them as a new commit on your current branch. The original commit stays on `feature`; merging or rebasing would bring in the whole branch.',
  },
  {
    id: 'git-i-18',
    prompt: 'What does `git tag -a v1.0 -m "First release"` add compared with plain `git tag v1.0`?',
    options: [
      'The ability to push the tag to a remote',
      'A branch named `v1.0`',
      'A tag object storing the tagger, date and message',
      'Protection so the tag can never be deleted',
    ],
    answer: 2,
    explanation:
      'A lightweight tag is just a name pointing at a commit. An annotated tag (`-a`) is a full object storing who tagged it, when and why, which is why it is the usual choice for releases. Both kinds can be pushed.',
  },
  {
    id: 'git-i-19',
    prompt: 'How do you publish the `v2.0` tag?',
    code: `git tag -a v2.0 -m "Release 2"
git push
# the remote still has no v2.0 tag`,
    options: [
      '`git push -u v2.0`',
      '`git push origin v2.0`',
      '`git fetch --tags`',
      '`git tag --push v2.0`',
    ],
    answer: 1,
    explanation:
      'A plain `git push` sends branches, not tags. Push a tag by name with `git push origin v2.0`, or send all your tags with `git push --tags`.',
  },
  {
    id: 'git-i-20',
    prompt: 'Why is `git push --force-with-lease` safer than `git push --force`?',
    options: [
      'It refuses if the remote branch moved since you fetched',
      "It merges the remote's commits before overwriting",
      'It only works on branches you created',
      'It keeps a backup branch on the remote',
    ],
    answer: 0,
    explanation:
      '`--force` overwrites the remote branch no matter what, which can silently delete a teammate\'s commits. `--force-with-lease` first checks that the remote still matches your `origin/<branch>`, and rejects the push if someone added work you haven\'t seen.',
  },
  {
    id: 'git-i-21',
    prompt: 'You want to keep the commit you just made. What should you run?',
    code: `git checkout fd83dd4
# You are in 'detached HEAD' state.
echo "test" > exp.txt
git add exp.txt
git commit -m "experiment"`,
    options: [
      '`git switch main`',
      '`git commit --amend`',
      '`git merge HEAD`',
      '`git switch -c experiment`',
    ],
    answer: 3,
    explanation:
      'In detached HEAD, `HEAD` points at a commit instead of a branch, so new commits belong to no branch. Creating a branch gives them a name; if you switch away first, Git warns that you are leaving the commit behind.',
  },
  {
    id: 'git-i-22',
    prompt: '`HEAD` is a merge commit. Which expression means its second parent (the tip of the branch that was merged in)?',
    options: ['`HEAD~2`', '`HEAD^2`', '`HEAD^^`', '`HEAD~1`'],
    answer: 1,
    explanation:
      '`^n` picks the nth parent, while `~n` walks back n generations along first parents. So `HEAD~2` and `HEAD^^` are both the grandparent, and `HEAD~1` equals `HEAD^`, the first parent.',
  },
  {
    id: 'git-i-23',
    prompt: 'What does this error mean?',
    code: `git branch -d spike
# error: the branch 'spike' is not fully merged`,
    options: [
      '`spike` is the branch you are currently on',
      '`spike` still exists on the remote',
      '`spike` has commits not merged into your current branch',
      '`spike` has uncommitted changes',
    ],
    answer: 2,
    explanation:
      '`-d` is the safe delete: it refuses when the branch has commits that would be lost. If you really want to throw them away, use `git branch -D spike`.',
  },
  {
    id: 'git-i-24',
    prompt: 'How do you delete the `feature` branch on the remote `origin`?',
    options: [
      '`git push origin --delete feature`',
      '`git branch -d origin/feature`',
      '`git branch -D feature`',
      '`git remote remove feature`',
    ],
    answer: 0,
    explanation:
      '`git branch -d` and `-D` only delete local branches. To change the remote you push, and `--delete` tells it to remove the branch there.',
  },
]
