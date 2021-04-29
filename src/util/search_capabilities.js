const filtersByObjectType = {
    boards: {
        filters: [ 
            {
                field: "state",
                title: "State", 
                type: "dropdown",
                values: ["all", "active", "archived", "deleted"]
            }, 
            /*{
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
            }*/
        ],
        searchableFields: ["state", "description", "name"],
        resultFields: {
            title: "name",
            url: null,
            created: null,
            updated: "updated_at"
        }
    },
    items: {
        filters: [
            /*{
                field: "state",
                title: "State",
                type: "dropdown",
                values: ['true', 'false'],
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
            }*/
        ],
        searchableFields: ["name", "state"],
        resultFields: {
            title:  "name",
            url: null,
            created: "created_at",
            updated: "updated_at"
        }
    },
    tags: {
        filters: [
            /*{
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
            }*/
        ],
        searchableFields: ["name", "color", "id"],
        resultFields: {
            title: "name",
            url: null,
            created: null
        }
    },
    updates: {
        filters: [
            /*{
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
            },*/
        ],
        searchableFields: ['created_at', 'text_body', 'updated_at'],
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
                values: ["all", "non_guests", "guests", "non_pending"],
            },
            /*{
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
            }*/
        ],
        searchableFields: ['name', 'email', 'phone', 'location', 'title', 'photo_small'],
        resultFields: {
            title: "name",
            url: "url",
            created: "created_at"
        }
    }
};

export default filtersByObjectType;
