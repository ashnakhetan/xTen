# aiPrompts

`aiPrompts` is an array of objects, each representing a unique AI prompt that can be used by the custom plugin. Each object has the following properties:

- `id`: A unique identifier for the AI prompt.
- `name`: The name of the AI prompt.
- `type`: The type of the prompt. In this case, it's 'aiPrompt'.
- `description`: A brief description of what the AI prompt does.
- `text`: The actual prompt that will be used.

# dataSources

`dataSources` is an array of objects, each representing a unique data source that the plugin can use. Each object has the following properties:

- `id`: A unique identifier for the data source.
- `name`: The name of the data source.
- `type`: The type of the source. In this case, it's 'dataSource'.
- `description`: A brief description of what the data source does.
- `execute`: An asynchronous function that will be called when the user clicks on the data source. This function should handle any necessary data retrieval.

# displayMethods

`displayMethods` is an array of objects, each representing a unique method for displaying the results of an AI prompt. Each object has the following properties:

- `id`: A unique identifier for the display method.
- `name`: The name of the display method.
- `type`: The type of the method. In this case, it's 'displayMethod'.
- `description`: A brief description of what the display method does.
- `execute`: A function that will be called when the user clicks on the display method. This function should handle any necessary data display.

These templates form the basic structure for creating custom plugins within the demo. By defining more `aiPrompts`, `dataSources`, and `displayMethods`, you can greatly extend the functionality of the custom plugin.
