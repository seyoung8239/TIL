import React from 'react';
import * as S from './styles';
import * as CS from '@styles/commonStyle';

const Footer = () => {
	return (
		<S.Footer>
			<CS.Pad />
			<S.Content>
				<div>Frontend Developer, @Seyoung Park</div>
			</S.Content>
			<CS.Pad />
		</S.Footer>
	);
};

export default Footer;
