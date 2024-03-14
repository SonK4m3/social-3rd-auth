import DashboardBox from '@/components/DashboardBox';
import { useGetPostsQuery } from '@/state/api';

type Props = {};

interface Post {
	id: number;
	title: string;
}

const Row1 = (props: Props) => {
	const { data } = useGetPostsQuery();

	return (
		<>
			<DashboardBox gridArea="a" p="1rem 1.5rem">
				{data?.map((p: Post, index: number) => (
					<div key={index}>
						{p.id} - {p.title}
					</div>
				))}
			</DashboardBox>
			<DashboardBox gridArea="b"></DashboardBox>
			<DashboardBox gridArea="c"></DashboardBox>
		</>
	);
};

export default Row1;
