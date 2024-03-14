import DashboardBox from '@/components/DashboardBox';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Row1 from './Row1';

type Props = {};

const gridTemplateLargeScreens = `
	"a b c"
	"a b c"
	"a b c"
	"a b f"
	"d e f"
	"d e f"
	"d h i"
	"g h i"
	"g h j"
	"g h j"
`;

const gridTemplateSmallScreens = `
	"a"
	"b"
	"c"
	"d"
	"e"
	"f"
	"g"
	"h"
`;

const Dashboard = (props: Props) => {
	const isAboutMediumScreens = useMediaQuery('(min-width: 1200px');
	const { palette } = useTheme();

	return (
		<Box
			width="100%"
			height="100%"
			display="grid"
			gap="1.5rem"
			sx={
				isAboutMediumScreens
					? {
							gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',
							gridTemplateRows: 'repeat(10, minmax(60px, 1fr)',
							gridTemplateAreas: gridTemplateLargeScreens,
					  }
					: {
							gridTemplateColumns: '1fr',
							gridTemplateRows: '80px',
							gridTemplateAreas: gridTemplateSmallScreens,
					  }
			}
		>
			<Row1></Row1>
			<DashboardBox gridArea="d"></DashboardBox>
			<DashboardBox gridArea="e"></DashboardBox>
			<DashboardBox gridArea="f"></DashboardBox>
			<DashboardBox gridArea="g"></DashboardBox>
			<DashboardBox gridArea="h"></DashboardBox>
		</Box>
	);
};

export default Dashboard;
