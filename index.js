import {processContent} from 'aurelia-framework';

export function enhancedTemplate(Target, name, def) {
  return processContent(function(viewCompiler, viewResources, element, instruction) {

    let template;

    if (instruction.type.viewFactory) {
      template = instruction.type.viewFactory.template;
      const contents = template.querySelectorAll('content');

      for (let content of contents) {
        const select = content.getAttribute('select');
        let innerTemplate;
        if (select) {
          innerTemplate = element.querySelector(select);
        } else {
          innerTemplate = document.createElement('div');
          innerTemplate.innerHTML = element.innerHTML;
        }
        content.parentNode.replaceChild(innerTemplate, content);
      }
    } else {
      template = `<template>${element.innerHTML}</template>`;
    }

    instruction.viewFactory = viewCompiler.compile(template, viewResources, instruction);
    element.innerHTML = '';
    return false;
  });
}

