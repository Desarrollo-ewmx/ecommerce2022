<template>
    <div>
        <div v-if="currentFile" class="progress">
            <div
                class="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{ width: progress + '%' }"
            >{{ progress }}%</div>
        </div>

        <!-- <label class="btn btn-default">
            <input type="file" ref="file" @change="selectFile" />
        </label>-->

        <b-form-file
            v-model="selectedFiles"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
        ></b-form-file>

        <input type="file" accept="image/*" ref="file" @change="upload" />
        <div class="mt-3">Selected file: {{ selectedFiles ? selectedFiles.name : '' }}</div>

        <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">Upload</button>

        <div class="alert alert-light" role="alert">{{ message }}</div>

        <div class="card">
            <div class="card-header">List of Files</div>
            <ul class="list-group list-group-flush">
                <!-- <li class="list-group-item" v-for="(file, index) in fileInfos" :key="index">
                    <a :href="file.url">{{ file.name }}</a>
                </li>-->
            </ul>
        </div>
    </div>
</template>

<script>
import UploadService from '~/store/UploadFilesService';

export default {
    name: 'upload-files',
    data() {
        return {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: '',
            result: null,

            fileInfos: [],
            user: {
                id: 8305,
                nom: 'chapulin',
                tel_mov: 12456789,
                password: 'huevojuan',
                img: ''
            }
        };
    },
    methods: {
        selectFile() {
            this.selectedFiles = this.$refs.file.files;
        },
        readFile(event) {
            textarea.textContent = event.target.result;
            console.log(event.target.result);
        },
        async upload() {
            // this.user.img = this.selectedFiles
            this.user.img = this.$refs.file.files.item(0);
            await this.$store.dispatch('auth/image', this.user);
            // this.progress = 0;
            // console.log("Obtuve")
            // console.log(this.selectedFiles)
            // var reader = new FileReader();
            // var reader2 = new FileReader();
            // reader.readAsText(this.selectedFiles);
            // console.log("Resultado: ")
            // console.log(reader)
            // reader2.readAsDataURL(this.selectedFiles);
            // console.log(reader2.result)
            // fetch(this.selectedFiles).then(function (response) {
            //     return response.blob();
            // })
            //     .then(function (blob) {
            //         console.log(blob)
            //         this.fileInfos = blob;
            //         console.log(this.fileInfos)
            //     });



            // this.currentFile = this.selectedFiles.item(0);
            // UploadService.upload(this.currentFile, (event) => {
            //     this.progress = Math.round((100 * event.loaded) / event.total);
            // })
            //     .then((response) => {
            //         this.message = response.data.message;
            //         return UploadService.getFiles();
            //     })
            //     .then((files) => {
            //         this.fileInfos = files.data;

            //     })
            //     .catch(() => {
            //         this.progress = 0;
            //         this.message = 'Could not upload the file!';
            //         this.currentFile = undefined;
            //     });

            // this.selectedFiles = undefined;
        },
    },
    // mounted() {
    //     UploadService.getFiles().then((response) => {
    //         this.fileInfos = response.data;
    //     });
    // },
};
</script>
