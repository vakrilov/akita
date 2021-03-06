import { Rule, apply, branchAndMerge, chain, mergeWith, move, template, url, Tree, SchematicContext } from '@angular-devkit/schematics';

import { getProjectPath, stringUtils, parseName } from '../utils';

export default function(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    options.path = getProjectPath(host, options);

    const parsedPath = parseName(options);
    options.name = parsedPath.name;
    options.path = parsedPath.path;

    const templateSource = apply(url('./files'), [
      template({
        ...stringUtils,
        ...(options as object)
      } as any),
      move(parsedPath.path)
    ]);

    return chain([branchAndMerge(chain([mergeWith(templateSource)]))])(host, context);
  };
}
