<template>
    <div class='documentation'>
        <v-container>
            <v-row>
                <h1>Developer Documentation</h1>
            </v-row>
            <v-row>
                <p>Here you will find the necessary documentation to communicate with ElectroReviewAPI's RESTful API service. Such communication includes the ability to retrieve reviews, update reviews, and submit reviews for your egistered organisation.</p>
            </v-row>
            <v-row>
                <h4>Security</h4>
            </v-row>
            <v-row>
                <p>To communicate with the RESTful API you are required to use an API key which can be generated on the <b>developer</b> tab. This ensures our services remain secure and your information remains confidental.</p>
            </v-row>
            <v-row class="url">
                <h5>Review API URL: </h5><v-chip label class="ma=2" color="green" text-color="black">{{ url }}</v-chip>
            </v-row>
        </v-container>

        <v-container>
            <h2>Endpoints</h2>
            <v-expansion-panels class="endpoints" variant="accordion">
                <v-expansion-panel
                    v-for="endpoint in endpoints"
                    :key="endpoint"
                    v-bind:class="getClassFromType(endpoint.type)"
                >
                    <v-expansion-panel-title>
                        <v-chip label>{{ endpoint.type }}</v-chip>
                        <p class="route"> {{ endpoint.route }}</p>
                        <p>{{ endpoint.name }}</p>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        {{ endpoint.description }}
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="doc-header">
                        <p>Parameters</p>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text v-if="endpoint.urlParams.length > 0" class="parameters">
                        <p>URL Parameters</p>
                        <v-divider></v-divider>
                        <div class="url-param" v-for="param in endpoint.urlParams" :key="param">
                            <v-row>
                                <code>
                                    <v-col>
                                        <p>name: <span>{{ param.name }}</span></p>
                                    </v-col>
                                    <v-col>
                                        <p>data type: <span>{{ param.data_type }}</span></p>
                                    </v-col>
                                    <v-col>
                                        <p>example: <span>{{ param.example }}</span></p>
                                    </v-col>
                                </code>
                            </v-row>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text v-if="endpoint.parameters.length > 0" class="parameters">
                        <p>Body</p>
                        <v-divider></v-divider>
                        <div class="code">
                            <pre
                            v-for="param in endpoint.parameters" 
                            :key="param"><code>{{ printModelAsString(param) }}</code></pre>
                        </div>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="doc-header">
                        <p>Responses</p>
                    </v-expansion-panel-text>
                    <v-expansion-panel-text class="responses" 
                        v-for="response in endpoint.responses" 
                        :key="response"
                        v-bind:class="getClassFromStatus(response.status_code)"
                    >
                        <v-row>  
                            <v-chip label>{{ response.status_code }}</v-chip>
                            <p v-if="getClassFromStatus(response.status_code) == 'success'">Successful Response</p>
                            <p v-if="getClassFromStatus(response.status_code) == 'error'">Error Response</p>
                        </v-row>
                        <v-divider></v-divider>
                        <div class="code" v-if="getClassFromStatus(response.status_code) == 'success'">
                            <pre><code>{{ printResponseModelAsString(response) }}</code></pre>
                        </div>
                        <div class="code" v-if="getClassFromStatus(response.status_code) == 'error'">
                            <pre><code>{{ printErrorModelAsString(response) }}</code></pre>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>

        <v-container class="models">
            <h2>Models</h2>
            <v-expansion-panels variant="accordion">
                <v-expansion-panel
                    v-for="model in models"
                    :key="model"
                >
                    <v-expansion-panel-title>
                        <p>{{ model.name }}</p>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <div class="model">
                            <v-row v-for="row in modelToArray(model.model)" :key="row" class="row">
                                <v-col cols="2" class="attr"><p class="name">{{ row.name }}</p></v-col>
                                <v-col cols="10" class="prop">
                                    <v-row>{{ row.data_type.toUpperCase() }}</v-row>
                                    <v-row><span>{{ row.example }}</span></v-row>
                                </v-col>
                            </v-row>
                        </div>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </div>
</template>

<script>

const ReviewModel = {
    id: {
        name: 'id',
        data_type: 'integer',
        example: '41'
    },
    reviewer: {
        name: 'reviewer',
        data_type: 'string',
        example: 'Derrick Hayworth'
    },
    rating: {
        name: 'rating',
        data_type: 'integer',
        example: 9
    },
    date_added: {
        name: 'date_added',
        data_type: 'date',
        example: '2022-03-01'
    },
    description: {
        name: 'description',
        data_type: 'string',
        example: 'The battery life of this product is amazing!'
    },
    api_key: {
        name: 'api_key_id',
        data_type: 'integer',
        example: 12
    },
    item_id: {
        name: 'item_id',
        data_type: 'integer',
        example: 21
    }
};

const UpdateReviewModel = {
    id: {
        name: 'id',
        data_type: 'integer',
        example: '41'
    },
    api_key: {
        name: 'api_key',
        data_type: 'string',
        example: 'reho54tBuQFbfHk1-XoYUYbgTuwQD2B1iltrLisr-3SC1Kq$UP'
    },
    reviewer: {
        name: 'reviewer',
        data_type: 'string',
        example: 'Derrick Hayworth'
    },
    rating: {
        name: 'rating',
        data_type: 'integer',
        example: 9
    },
    description: {
        name: 'description',
        data_type: 'string',
        example: 'The battery life of this product is amazing!'
    },
    item_id: {
        name: 'item_id',
        data_type: 'integer',
        example: 21
    }
}

const AddReviewModel = {
    api_key: {
        name: 'api_key',
        data_type: 'string',
        example: 'reho54tBuQFbfHk1-XoYUYbgTuwQD2B1iltrLisr-3SC1Kq$UP'
    },
    reviewer: {
        name: 'reviewer',
        data_type: 'string',
        example: 'Derrick Hayworth'
    },
    rating: {
        name: 'rating',
        data_type: 'integer',
        example: 9
    },
    description: {
        name: 'description',
        data_type: 'string',
        example: 'The battery life of this product is amazing!'
    },
    item_id: {
        name: 'item_id',
        data_type: 'integer',
        example: 21
    }
};

const APIKeyModel = {
    api_key: {
        name: 'api_key',
        data_type: 'string',
        example: 'reho54tBuQFbfHk1-XoYUYbgTuwQD2B1iltrLisr-3SC1Kq$UP'
    }
}

const NameModel = {
    api_key: {
        name: 'api_key',
        data_type: 'string',
        example: 'reho54tBuQFbfHk1-XoYUYbgTuwQD2B1iltrLisr-3SC1Kq$UP'
    },
    name: {
        name: 'name',
        data_type: 'string',
        example: 'iPhone 13 Pro Max'
    }
}

const SuccessModel = {
    status: {
        name: 'status',
        data_type: 'integer',
        example: 200
    },
    payload: {
        name: 'payload',
        data_type: 'object',
        example: ReviewModel
    }
};

const ReviewArrayModel = {
    status: {
        name: 'status',
        data_type: 'integer',
        example: 200
    },
    array: [
        ReviewModel
    ]
}

const ErrorModel = {
    status: {
        name: 'status',
        data_type: 'integer',
        example: 400
    },
    message: {
        name: 'message',
        data_type: 'string',
        example: 'The value you have provided for description is invalid.'
    }
};

const IDModel = {
    api_key: {
        name: 'api_key',
        data_type: 'string',
        example: 'reho54tBuQFbfHk1-XoYUYbgTuwQD2B1iltrLisr-3SC1Kq$UP'
    },
    id: {
        name: 'id',
        data_type: 'integer',
        example: 14
    }
};

const IDReturnModel = {
    id: {
        name: 'id',
        data_type: 'integer',
        example: 14
    } 
}

const DeleteSuccessModel = {
    status: {
        name: 'status',
        data_type: 'integer',
        example: 200
    },
    payload: {
        name: 'payload',
        data_type: 'Object',
        example: IDReturnModel
    }
}

let models = [
    {
        name: 'Review',
        model: ReviewModel
    },
    {
        name: 'AddReview',
        model: AddReviewModel
    },
    {
        name: 'UpdateReview',
        model: UpdateReviewModel
    },
    {
        name: 'APIKey',
        model: APIKeyModel
    },
    { 
        name: 'Name',
        model: NameModel
    },
    {
        name: 'Success',
        model: SuccessModel
    },
    {
        name: 'Error',
        model: ErrorModel
    },
    {
        name: 'ReviewArray',
        model: ReviewArrayModel
    },
    {
        name: 'ID',
        model: IDModel
    },
    {
        name: 'DeleteSuccess',
        model: DeleteSuccessModel 
    }
];

models.sort(function(a,b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );

export default {
    name: 'DocumentationComponent',
    data: () => {
        return {
            url: 'https://electro-review-api-backend.azurewebsites.net/',
            models: models,
            endpoints: [
                {
                    type: 'POST',
                    name: 'Add Review',
                    route: '/reviews/',
                    description: 'Submit a product review to the service for storage and have it contribute to business intelligence.',
                    urlParams: [],
                    parameters: [
                        AddReviewModel
                    ],
                    responses: [
                        {
                            status_code: 201,
                            model: SuccessModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                },
                {
                    type: 'GET',
                    name: 'Get All Reviews',
                    route: '/reviews/all',
                    description: 'Return all reviews submitted by your organisation.',
                    urlParams: [],
                    parameters: [
                        APIKeyModel
                    ],
                    responses: [
                        {
                            status_code: 200,
                            model: ReviewArrayModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                },
                {
                    type: 'GET',
                    name: 'Get Local Reviews for Product By Name',
                    route: '/reviews/local/item/name',
                    description: 'Return all reviews for a product with a provided name.',
                    urlParams: [],
                    parameters: [
                        NameModel
                    ],
                    responses: [
                        {
                            status_code: 200,
                            model: ReviewArrayModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                },
                {
                    type: 'GET',
                    name: 'Get Local Reviews for Product By Item ID',
                    route: '/reviews/local/item/{id}',
                    description: 'Return all reviews for a product with a provided Item ID.',
                    urlParams: [
                        {
                            name: 'id',
                            data_type: 'integer',
                            example: 14
                        }
                    ],
                    parameters: [
                        APIKeyModel
                    ],
                    responses: [
                        {
                            status_code: 200,
                            model: ReviewArrayModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                },
                {
                    type: 'GET',
                    name: 'Get Global Local Reviews for Product By Name',
                    route: '/reviews/global/item/name',
                    description: 'Return all reviews for a product with a provided name across all organisations.',
                    urlParams: [],
                    parameters: [
                        NameModel
                    ],
                    responses: [
                        {
                            status_code: 200,
                            model: ReviewArrayModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                },
                {
                    type: 'GET',
                    name: 'Get Global Reviews for Product By Item ID',
                    route: '/reviews/global/item/{id}',
                    description: 'Return all reviews for a product with a provided Item ID across all organisations.',
                    urlParams: [
                        {
                            name: 'id',
                            data_type: 'integer',
                            example: 14
                        }
                    ],
                    parameters: [
                        APIKeyModel
                    ],
                    responses: [
                        {
                            status_code: 200,
                            model: ReviewArrayModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                },
                {
                    type: 'GET',
                    name: 'Get Review By ID',
                    route: '/reviews/{id}',
                    description: 'Get a specific review according to an ID.',
                    urlParams: [
                        {
                            name: 'id',
                            data_type: 'integer',
                            example: 14
                        }
                    ],
                    parameters: [
                        APIKeyModel
                    ],
                    responses: [
                        {
                            status_code: 200,
                            model: SuccessModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                },
                {
                    type: 'PUT',
                    name: 'Update Review',
                    route: '/reviews/',
                    description: 'Update a specified product review.',
                    urlParams: [],
                    parameters: [
                        UpdateReviewModel
                    ],
                    responses: [
                        {
                            status_code: 200,
                            model: SuccessModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                },
                {
                    type: 'DELETE',
                    name: 'Delete Review',
                    route: '/reviews/',
                    description: 'Delete a specified product review.',
                    urlParams: [],
                    parameters: [
                        IDModel
                    ],
                    responses: [
                        {
                            status_code: 201,
                            model: DeleteSuccessModel
                        },
                        {
                            status_code: 400,
                            model: ErrorModel
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        getClassFromType: function(type) {
            if (type == 'POST') return 'post';
            if (type == 'GET') return 'get';
            if (type == 'PUT') return 'put';
            if (type == 'DELETE') return 'delete'
        },
        printModelAsString: function(model) {
            let newModel = {};

            Object.keys(model).forEach((key) => {
                Object.keys(model[key]).forEach((k) => {
                    if (k == 'example') {
                        newModel[key] = model[key][k];
                    }
                })
            });

            let json = JSON.stringify(newModel, undefined, 4);
            return json;
        },
        getClassFromStatus: function(status_code) {
            let string = String(status_code)[0];
            if (string == '2') return 'success';
            if (string == '4') return 'error';
        },
        printModelArrayAsString: function(array) {
            let newArray = array;
            return newArray;
        },
        printResponseModelAsString: function(model) {
            let newModel = {};

            let modelObj = model['model'];

            // set status
            newModel['status'] = modelObj['status']['example'];

            if (Array.isArray(modelObj['array'])) {
                let array = modelObj['array'];
                let tempObj = {};
                let payload = [];

                Object.keys(array).forEach((key) => {
                    Object.keys(array[key]).forEach((k) => {
                        Object.keys(array[key][k]).forEach((i) => {
                            if (i == 'example') {
                                tempObj[k] = array[key][k][i];
                            }
                        })
                    })
                });

                payload.push(tempObj);

                newModel['payload'] = payload;
                
                let json = JSON.stringify(newModel, undefined, 4)

                return json;
            }
            else {
                let payload = {};

                let currentPayloadModel = modelObj['payload']['example'];
                Object.keys(currentPayloadModel).forEach((key) => {
                    Object.keys(currentPayloadModel[key]).forEach((k) => {
                        if (k == 'example') {
                            payload[key] = currentPayloadModel[key][k];
                        }
                    })
                })

                newModel['payload'] = payload;

                let json = JSON.stringify(newModel, undefined, 4)

                return json;
            }
        },
        printErrorModelAsString: function(model) {
            let errorModel = model['model'];
            let newModel = {};

            Object.keys(errorModel).forEach((key) => {
                Object.keys(errorModel[key]).forEach((k) => {
                    if (k == 'example') {
                        newModel[key] = errorModel[key][k]
                    }
                })
            });

            let json = JSON.stringify(newModel, undefined, 4)
            return json;
        },
        modelToArray: function(model) {
            let rows = [];

            Object.keys(model).forEach(m => {
                let row = {
                    name: model[m]['name'],
                    data_type: model[m]['data_type'],
                    example: model[m]['example']
                };

                if (row.data_type == 'object') {
                    row.example = 'Review Model'
                }

                if (row.data_type == undefined) {
                    row.name = 'payload'
                    row.data_type = 'ARRAY(REVIEW)'
                    row.example = 'Review Model'
                }
                
                rows.push(row)
            });

            return rows;
        }
    }
}
</script>

<style lang="scss" scoped>

.documentation {
    padding: 2rem;

    .v-container {
        font-family: 'Roboto Condensed', sans-serif;
        background-color: #ffffff;
        border-radius: 0.5rem;
        box-shadow: 0px 2px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
        margin-bottom: 2rem;
        padding: 3rem;

        h1 {
            margin-bottom: 3rem;
            font-size: 2.7rem;
            font-weight: bold;
        }

        h2 {            
            margin-bottom: 3rem;
            font-size: 1.8rem;
            font-weight: bold;
        }

        h3 {
            font-size: 1.8rem;
        }

        h4 {
            font-size: 1.4rem;
            margin-top: 1.4rem;
            margin-bottom: 1.4rem;
        }

        h5 {
            font-size: 1.1rem;
        }

        p {
            font-size: 1.2rem;
            color: #5E3838;
            margin-bottom: 1rem;

            span {
                color: #38BD3D;
            }
        }
    }

    .url {
        margin-top: 1rem;
        h5 {
            padding-right: 1rem;
        }

        .v-chip {
            font-size: 1rem;
        }
    }

    .v-expansion-panel {
        font-size: 1rem;
        margin-bottom: 1rem;

        .v-chip {
            margin-right: 1rem;
        }

        .v-expansion-panel-title {
            p {
                margin-bottom: 0rem;
                font-size: 1.1rem;

                &.route {
                    margin-right: 2rem;
                    font-family: 'Source Code Pro', monospace;
                    font-weight: bold;
                    font-size: 0.9rem;
                }
            }
        }
    }

    .v-expansion-panel-title--active .v-expansion-panel-title__overlay {
        opacity: 1 !important;
    }

    .v-expansion-panel-text__wrapper {
        padding: 8px 11px 16px !important;
    }

    .v-expansion-panel.get {
        background-color: #EBF3FB;
        border: 1px solid #61affe;

        .v-chip {
            background-color: #61AFFE;
            color: white;
        }

        .doc-header {
            background-color: #cfe6fd;
            border-top: 1px solid #61affe;
            border-bottom: 1px solid #61affe;
        }
    }

    .v-expansion-panel.post {
        background-color: #E8F6F0;
        border: 1px solid #afe7ce;

        .v-chip {
            background-color: #49CC90;
            color: white;
        }

        .doc-header {
            background-color: #a2f0ce;
            border-top: 1px solid #afe7ce;
            border-bottom: 1px solid #afe7ce;
        }
    }

    .v-expansion-panel.delete {
        background-color: #FAE7E7;
        border: 1px solid #F98B8B;

        .v-chip {
            background-color: #F93E3E;
            color: white;
        }

        .doc-header {
            background-color: #ffd9d9;
            border-top: 1px solid #F98B8B;
            border-bottom: 1px solid #F98B8B;
        }
    }

    .v-expansion-panel.put {
        background-color: #FBF1E6;
        border: 1px solid #FCB255;

        .v-chip {
            background-color: #FCA130;
            color: white;
        }

        .doc-header {
            background-color: #ffeedc;
            border-top: 1px solid #FCB255;
            border-bottom: 1px solid #FCB255;
        }
    }

    .doc-header {
        max-height: 2.8rem;
        p {
            font-size: 1.1rem;
        }
    }

    .code {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 0.4rem;
        font-size: 0.9rem;
        overflow-x: auto;
        height: auto;

        pre {
            font-size: 0.9rem;
            padding: 1rem;
        }
    }

    .parameters {
        p {
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
        }
    }

    .responses {
        .v-row {
            margin: 0;

            p {
                margin-top: 0.5rem;
                margin-left: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .v-chip {
                margin-top: 0.3rem;
            }
        }
    }

    .success {
        .v-chip {
            background-color: #36ad78 !important;
        }
    }

    .error {
        .v-chip {
            background-color: #fc2c2c !important;
        }
    }

    .url-param {
        margin-top: 1rem;
        border-radius: 4px;

        background-color: rgba(255, 255, 255, 0.7);
        .v-row {
            max-width: 800px;
            margin-left: 1rem;
        }
        .v-col {
            padding-bottom: 0px;
            padding-top: 0px;
        }

        p {
            font-size: 1rem;
        }
        span {
            color: rgb(23, 122, 23);
        }
    }

    .models {
        .attr {
            font-size: 1.2rem;
            font-weight: bold;
        }

        .prop {
            padding: 0.2rem;
            span {
                color: rgb(23, 122, 23);
                font-style: italic;
            }
        }

        .v-row {
            padding: 0.6rem;
            margin-left: 3rem;
            font-size: 0.9rem;
        }

        .model {
            background-color: rgba(209, 209, 209, 0.2);
            border-radius: 4px;
        }

        .name {
            font-size: 0.9rem;
        }

        .v-expansion-panel-text {
            padding: 1.2rem;
            padding-top: 2rem;
            padding-bottom: 2rem;
            font-family: 'Source Code Pro', monospace;
        }

        .v-expansion-panel-title {
            padding: 1.6rem;
        }
    }
}

</style>