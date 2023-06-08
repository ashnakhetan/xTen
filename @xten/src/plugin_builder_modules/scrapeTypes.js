export const scrapeTypes = [
    {
        id: 'scrapeType1',
        name: 'Title',
        type: 'scrapeType',
        description: 'Extract the site\'s title.',
        text: 'Get site\'s title.',
        tags: ['h1', 'h2', 'title'],
        classes: []
    },
    {
        id: 'scrapeType2',
        name: 'All Text',
        type: 'scrapeType',
        description: 'Extract all of the plaintext from the site.',
        text: 'Get site\'s text.',
        tags: ['p'],
        classes: []
    },
    {
        id: 'scrapeType3',
        name: 'Contact Information',
        type: 'scrapeType',
        description: 'Get contact information from the site.',
        text: 'Get contact information.',
        tags: [],
        classes: ['contact']
    }
    // More aiPrompts
];