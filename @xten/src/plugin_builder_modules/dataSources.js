export const dataSources = {
    dataSource1: {
        name: 'dataSource1',
        type: 'dataSource',
        description: 'This is a description of dataSource1',
        // This is the function that will be called when the user clicks on the dataSource
        execute: function () {
            console.log('dataSource1 was clicked');
        }
    }
    // More dataSources
};