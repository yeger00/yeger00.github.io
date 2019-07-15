# Auto class diagram in Python

Class diagram according to [Wikipedia](https://en.wikipedia.org/wiki/Class_diagram) is a: “structure diagram that describes the structure of a system by showing the system's classes, their attributes, operations (or methods), and the relationships among objects.”. It is a good and easy way to dive into a new library. Automatically generate class diagram make sure it is up to date.

TL;DR:
1. Generate class diagram with [pyreverse](https://pypi.org/project/pyreverse/)
1. View it with [graph-easy](https://github.com/ironcamel/Graph-Easy)
1. Automatically generate it with git [hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
1. View the diffs with [graphdiff](https://pypi.org/project/graphdiff/)


In order to generate class diagram for a Python library, you can use the [pyreverse](https://pypi.org/project/pyreverse/) tool that is now part of [pylint](https://pypi.org/project/pylint/). In order to install you can:
```bash
pip install pylint
```
or follow the [README.rst](https://github.com/PyCQA/pylint/blob/master/README.rst). After installing it, you can use it with the command:
```bash
pyreverse -k -o dot /path/to/library
```
This will generate class diagram for the library and save it to the file `./classes.dot`. It will also create a `./pakcages.dot` file, but we won’t talk about it here. The [.dot](https://en.wikipedia.org/wiki/DOT_(graph_description_language)) format is a description language for graphs. In order to view it you can use the [Graphviz](https://en.wikipedia.org/wiki/Graphviz) package, or the [graph-easy](https://github.com/ironcamel/Graph-Easy\) package. We’ll use the later because it supports viewing it in the CLI. In order to install it you can:
```bash
sudo apt-get install libgraph-easy-perl
```
You can view the `classes.dot` with the command:
```bash
cat classes.dot | graph-easy --as boxart
```
In order to auto generate it for every commit, you can use [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). Git hooks enable you to perform something before a git action occur. You can use the pre-commit hook to generate the classes.dot file, and then add it, before the commit is performed.
```bash
echo '#!/bin/sh

pyreverse -o dot ./pylspclient -k
git add ./classes.dot
' >> ./git/hooks/pre-commit

chmod +x ./git/hooks/pre-commit
```
After you add a couple of commits, you can view the diffs with [graphdiff](https://github.com/yeger00/graph-diff). In order to install you can:
```bash
pip install graphdiff
```
After installing it, you can use the [git-graph-diff-tool](https://github.com/yeger00/graph-diff#git-graph-diff-tool). It enables to view diffs between .dot files in visual way. First, you need to add to .gitattributes file rules to know how to handle .dot files. For example:

```bash
echo "*.dot diff=graph_diff" >> .gitattributes
```
Then, configure the difftool to be the git-graph-diff-tool. For example:
```bash
git config diff.graph_diff.command /path/to/git-graph-diff-tool
```
Then, you can use git as usual, while adding --ext-diff flag to enable external difftools.
```bash
git log -p --ext-diff
```


You can see a working example in the [pylspclient](https://github.com/yeger00/pylspclient/blob/master/classes.dot) library.
