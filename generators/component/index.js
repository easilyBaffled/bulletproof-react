module.exports = {
    description: 'Component Generator',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'component name',
        },
        {
            type: 'input',
            name: 'folder',
            message: 'folder in components',
        },
    ],
    actions: [
        {
            type: 'add',
            path: 'src/components/{{folder}}/{{properCase name}}/index.js',
            templateFile: 'generators/component/index.js.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{folder}}/{{properCase name}}/{{properCase name}}.jsx',
            templateFile: 'generators/component/Component.jsx.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{folder}}/{{properCase name}}/{{properCase name}}.stories.jsx',
            templateFile: 'generators/component/Component.stories.jsx.hbs',
        },
    ],
};
