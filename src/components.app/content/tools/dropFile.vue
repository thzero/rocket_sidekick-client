<template>
	<div class="main">
		<div
			class="dropzone-container"
			@dragover="dragover"
			@dragleave="dragleave"
			@drop="drop"
		>
			<input
				id="fileInput"
				name="fileInput"
				ref="fileInput"
				type="file"
				accept=".csv"
				@change="onChange"
				class="hidden-input"
			/>

			<label for="fileInput" class="file-label">
				<div v-if="isDragging">{{ $t('strings.content.drop.file1') }}</div>
				<div v-else>{{ $t('strings.content.drop.file2') }} <u>{{ $t('strings.content.drop.click') }}</u> {{ $t('strings.content.drop.file3') }}</div>
			</label>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'DropFile',
	emits: ['selected'],
	setup(props, context) {
		const fileInput = ref(null);
		const files = ref([]);
		const isDragging = ref(false);
		const showMessage = ref(false);
		const output = ref(null);

		const dragover = async (e) => {
			e.preventDefault();
			isDragging.value = true;
		};
		const dragleave = async () => {
			isDragging.value = false;
		};
		const drop = (e) => {
			e.preventDefault();
			fileInput.value.files = e.dataTransfer.files;
			onChange();
		};
		const onChange = async () => {
			isDragging.value = false;
			const file = fileInput.value.files[0];

			// FileReader Object
			const reader = new FileReader();
			// Read file as string 
			reader.readAsText(file);
			// Load event
			reader.onload = function(event) {
				// Read file data
				output.value = event.target.result;
		        context.emit('selected', output.value);
			};
		};

		return {
			fileInput,
			files,
			isDragging,
			showMessage,
			dragleave,
			dragover,
			drop,
			onChange
		}
	},
	validations () {
		return useFlightPathValidation;
	}
};
</script>

<style>
	.dropzone-container {
		padding: 2rem;
		background: rgb(98, 98, 98);
		border: 1px solid #e2e8f0;
	}
	.hidden-input {
		opacity: 0;
		overflow: hidden;
		position: absolute;
		width: 1px;
		height: 1px;
	}
	.file-label {
		display: block;
		cursor: pointer;
	}
</style>