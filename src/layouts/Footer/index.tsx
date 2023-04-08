import React from 'react';
import * as S from './styles';
import * as CS from '@styles/commonStyle';

const Footer = () => {
	return (
		<S.Footer>
			<CS.Pad />
			<CS.Divider />
			<S.Content>
				<div>Frontend Developer, @Seyoung Park</div>
			</S.Content>
			<CS.Divider />
			<CS.Pad />
		</S.Footer>
	);
};

export default Footer;
