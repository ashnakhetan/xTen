import { displayText } from '../utils/display.js';

export const displayMethods = [
    {
        id: 'displayMethod1',
        name: 'Display Text',
        type: 'displayMethod',
        description: 'Displays text in a tooltip.',
        // This is the function that will be called when the user clicks on the displayMethod
        execute: function (data) {
            console.log('displayLoading was clicked');
            displayText(data);
        }
    },
    // More displayMethods
];