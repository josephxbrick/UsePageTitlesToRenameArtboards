# UsePageTitlesToRenameArtboards
This plugin is handy if your artboards contain a symbol instance to display the artboard's title. (E.g., when using Sketch to produce a PDF or printed document that has a title on each page.) 

This plug-in renames artboards on the current Sketch page to the text of the symbol instance containing the page's title, as you might have in a header symbol.

The title needs to be in a symbol-instance override named '<pageTitle>'. It doesn't matter what the symbol instance itself is called or how many other overrides there are in the symbol. <pageTitle> cannot be part of a nested symbol, however.
  
Your symbol should be set up like this:

<img src="/readme_images/sample.png" width="400">

Check out the sample.sketch file in this repository, which contains a properly configured symbol.
