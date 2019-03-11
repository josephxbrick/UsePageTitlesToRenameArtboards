@import 'common.js';
@import 'symbolfunctions.js';
/*
 This plug-in renames artboards on the current page to the override text of a symbol instance
 containing the page's title. (E.g., as you might have in a header.)

 The title needs to be in a symbol-instance override named '<pageTitle>'. It doesn't matter what
 the symbol instance itself is called.
*/
var onRun = function(context) {
  let doc = context.document;
  let thisPage = doc.currentPage();
  updateArtboards(doc, thisPage);
}

function updateArtboards(doc, page) {
  const artboardTitleOverrideName = '<pageTitle>'
  let artboards = [page artboards];
  let artboardCount = artboards.count();
  let titlesAdded = 0;
  for (let i = 0; i < artboardCount; i++) {
    let artboard = artboards[i];
    setTimeout(() => {
      doc.showMessage(`Updating artboard ${i + 1}. ${((i + 1)/artboardCount * 100).toFixed(0)}% complete.`)
    }, 0);
    layers = artboard.children();
    for (let j = 0; j < layers.count(); j++) {
      let layer = layers[j];
      if (layer.class() === MSSymbolInstance) {
        if (setArtboardName(artboard, layer, artboardTitleOverrideName) !== undefined) {
          titlesAdded++;
        }
      }
    }
  }

  const br = String.fromCharCode(13);
  setTimeout(() => {
    alert('Update complete.', `${br}Titles updated: ${titlesAdded}`)
  }, 50);
}

function setArtboardName(artboard, instance, overrideName) {
  let overrideText = getOverrideText(instance, overrideName);
  if (overrideText !== undefined) {
    artboard.setName(overrideText);
    return overrideText;
  }
  return undefined;
}
