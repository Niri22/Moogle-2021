const filtersByObjectType = {
    boards: {
        filters: [ 
            {
                field: "state",
                title: "State", 
                type: "dropdown",
                values: []
            }, 
            {
                field: "tags",
                title: "Tags",
                type: "text",
                values: []
            },
            {
                field: "updated_at",
                title: "Updated Date",
                type: "date",
                values: []
            }
        ],
        searchableFields: ["state", "description", "owner", "groups", "name", "subscribers", "tags", "updated_at"],
        resultFields: {
            title: "name",
            url: null,
            created: null,
            updated: "updated_at"
        }
    },
    assets: {
        filters: [
            {
                field: "file_extension",
                title: "File Extension",
                type: "text",
                values: [],
            },
            {
                field: "created_at",
                title: "Created Date",
                type: "date",
                values: [],
            }
        ],
        searchableFields: ["file_extension", "name", "uploaded_by"],
        resultFields: {
            title: ["name", "file_extension"],
            url: "url",
            created: "created_at"
        }
    },
    item: {
        filters: [
            {
                field: "state",
                title: "State",
                type: "dropdown",
                values: [],
            },
            {
                field: "created_at",
                title: "Created Date",
                type: "date",
                values: [],
            },
            {
                field: "updated_at",
                title: "Updated Date",
                type: "date",
                values: [],
            }
        ],
        searchableFields: ["board", "column_values", "created_at", "creator", "group", "name", "state", "subscribers", "updated_at"],
        resultFields: {
            title:  "name",
            url: null,
            created: "created_at",
            updated: "updated_at"
        }
    },
    tags: {
        filters: [
            {
                field: "archived",
                title: "Archived",
                type: "dropdown",
                values: ["True", "False"],
            },
            {
                field: "type",
                title: "Type",
                type: "dropdown",
                values: [],
            }
        ],
        searchableFields: [],
        resultFields: {
            title: "name",
            url: null,
            created: null
        }
    },
    updates: {
        filters: [
            {
                field: "archived",
                title: "Archived",
                type: "dropdown",
                values: ["True", "False"],
            },
            {
                field: "type",
                title: "Type",
                type: "dropdown",
                values: [],
            },
            {
                field: "created_at",
                title: "Created Date",
                type: "date",
                values: [],
            },
        ],
        searchableFields: [],
        resultFields: {
            title: "id",
            url: null,
            created: "created_at"
        }
    },
    users: {
        filters: [
            {
                field: "kind",
                title: "Kind",
                type: "dropdown",
                values: [],
            },
            {
                field: "country_code",
                title: "Country Code",
                type: "text",
                values: [],
            },
            {
                field: "created_at",
                title: "Created Date",
                type: "date",
                values: [],
            }
        ],
        searchableFields: [],
        resultFields: {
            title: "name",
            url: "url",
            created: "created_at"
        }
    }
};

export default filtersByObjectType;
