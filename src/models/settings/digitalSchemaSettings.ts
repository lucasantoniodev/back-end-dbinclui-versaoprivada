import { Schema } from 'mongoose';

export const digitalSchemaSettings ={
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    guide: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Guides',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    },
    filePaths: [
        {
            type: {
                path: String,
                filename: String,
            },
            required: true,
        },
    ],
};