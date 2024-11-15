import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("react-component", {
    description: "Adds a new react component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{kebabCase name}}.tsx",
        templateFile: "templates/component.hbs",
      },
      {
        type: "append",
        path: "package.json",
        pattern: /"exports": {(?<insertion>)/g,
        template: '    "./{{kebabCase name}}": "./src/{{kebabCase name}}.tsx",',
      },
    ],
  });

  plop.setGenerator("context", {
    description: "Generate a React Context with a custom hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of your Context (e.g., User)?",
      },
    ],
    actions: [
      // Create Context file
      {
        type: "add",
        path: "src/contexts/{{pascalCase name}}Context.tsx",
        templateFile: "templates/context.hbs",
      },
      // Create hook file
      {
        type: "add",
        path: "src/hooks/use{{pascalCase name}}.ts",
        templateFile: "templates/useContext.hbs",
      },
    ],
  });

  plop.setGenerator("query-hook", {
    description: "Generate a tanstack/query hook for fetching data",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of your hook (e.g., UserData)?",
      },
      {
        type: "input",
        name: "endpoint",
        message: "What is the API endpoint for this hook (e.g., /api/user)?",
      },
    ],
    actions: [
      // Create the query hook file
      {
        type: "add",
        path: "src/hooks/{{camelCase name}}.ts",
        templateFile: "templates/reactQueryHook.hbs",
      },
    ],
  });
}
