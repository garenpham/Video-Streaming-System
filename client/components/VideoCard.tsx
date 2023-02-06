import { IVideo } from '../pages';

const VideoCard = ({ id, filename, path }: IVideo) => {
	return (
		<video
			controls
			src={path}
			style={{ width: '440px', height: '384px' }}
			className="ml-4 mb-4"
		/>
	);
};
export default VideoCard;
