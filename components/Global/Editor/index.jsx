import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function Editor({ content, setContent }) {
	return (
		<div className="w-full h-full bg-gray-300 rounded-2xl flex flex-col">
			<ReactQuill theme="snow" value={content} onChange={(content) => {
				setContent(content)
			}} />
		</div>
	)
}