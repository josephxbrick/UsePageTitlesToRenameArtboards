@import 'common.js';
@import 'symbolfunctions.js';
const {toArray} = require('util');
var Settings = require('sketch/settings');

// called from plug-in menu
var _nameArtboards = function(context) {
  doc = context.document;
  let summary = [];
  if (checkNameArtboardSetup(doc, summary) !== undefined){
    nameArtboards(context, summary);
  }
  displaySummary(doc, summary);
}

//======================================================

function nameArtboards(context, summary) {
  const doc = context.document;
  const page = doc.currentPage();
  let artboards = toArray(page.layers()).filter(item => item.class() === MSArtboardGroup);
  let titlesAdded = 0;
  for (const artboard of artboards) {
    instances = toArray(artboard.children()).filter(item => item.class() === MSSymbolInstance);
    for (const instance of instances) {
      if (setArtboardName(artboard, instance, '<sectionTitle>') !== undefined) {
        titlesAdded++;
      }
      if (setArtboardName(artboard, instance, '<pageTitle>') !== undefined) {
        titlesAdded++;
      }
    }
  }
  // summary
  const br = String.fromCharCode(13);
  summary.push(`${titlesAdded} artboards named`);
}

function setArtboardName(artboard, instance, overrideName) {
  let overrideText = getOverrideText(instance, overrideName);
  if (overrideText !== undefined) {
    artboard.setName(overrideText);
    return overrideText;
  }
  return undefined;
}

function checkNameArtboardSetup(doc, summary) {
  const pageTitle = symbolMasterWithOverrideName(doc, '<pageTitle>');
  if (pageTitle === undefined) {
    summary.push('[ERROR]Name artboards: No symbol with override <pageTitle> found.');
    return undefined;
  }
  return 'success';
}
