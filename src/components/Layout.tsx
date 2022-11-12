import {Link, Outlet} from 'react-router-dom';
import { FlexDiv } from '../styles/globalStyleComponent';
import '../styles/globalStyles.scss';

export const Layout = ()=>{
    return(
        <FlexDiv flex="1 1 100%" height="100%" minWidth="320px" flexDirection="column">
            <FlexDiv 
                flex="0 1 80px" 
                width="100%" 
                justifyContent="flex-end" 
                alignItems="center"
                flexGap="15px"
                padding="15px"
                className="top-menu"    
            >
                <Link to="/" className="top-menu__link">
                    <FlexDiv flex="0 0 auto" alignItem="center" className="top-menu__link--name">Home</FlexDiv>
                </Link>

                <Link to="/dashboard" className="top-menu__link">
                    <FlexDiv flex="0 0 auto" alignItem="center" className="top-menu__link--name">User Login</FlexDiv>
                </Link>

            </FlexDiv>
            <FlexDiv flex="1" width="100%" padding="15px">
                <Outlet/>
            </FlexDiv>
        </FlexDiv>
    )
}