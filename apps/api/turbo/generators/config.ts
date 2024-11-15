import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('module', {
    description: 'Generate a full Nest.js module with CRUD operations',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the module (e.g., User)?',
      },
    ],
    actions: [
      // Create module file
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.module.ts',
        templateFile: 'templates/module/module.hbs',
      },
      // Create controller file
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.controller.ts',
        templateFile: 'templates/module/controller.hbs',
      },
      // Create service file
      {
        type: 'add',
        path: 'src/{{camelCase name}}/{{camelCase name}}.service.ts',
        templateFile: 'templates/module/service.hbs',
      },
      // Create DTO files
      {
        type: 'add',
        path: 'src/{{camelCase name}}/dto/create-{{camelCase name}}.dto.ts',
        templateFile: 'templates/module/create-dto.hbs',
      },
      {
        type: 'add',
        path: 'src/{{camelCase name}}/dto/update-{{camelCase name}}.dto.ts',
        templateFile: 'templates/module/update-dto.hbs',
      },
      // Create test files
      {
        type: 'add',
        path: 'test/{{camelCase name}}/{{camelCase name}}.controller.spec.ts',
        templateFile: 'templates/module/controller.spec.hbs',
      },
      {
        type: 'add',
        path: 'test/{{camelCase name}}/{{camelCase name}}.service.spec.ts',
        templateFile: 'templates/module/service.spec.hbs',
      },
      // Register the module in app.module.ts
      {
        type: 'modify',
        path: 'src/app.module.ts',
        pattern: /(import\s*{[^}]*}\s*from\s*'.\/app\.controller';)/g,
        template: `$1\nimport { {{pascalCase name}}Module } from './{{camelCase name}}/{{camelCase name}}.module';`,
      },
      {
        type: 'modify',
        path: 'src/app.module.ts',
        pattern: /(imports:\s*\[)([^]*?)\]/g,
        template: `$1$2,\n    {{pascalCase name}}Module]`,
      },
    ],
  });
}
