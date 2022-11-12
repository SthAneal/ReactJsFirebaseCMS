import styled,{css} from 'styled-components';

const FlexDiv = styled.div`
    display: flex;
    box-sizing:${props=>props.boxSizing || "border-box"};
    width: ${props=>props.width || ""};
    height: ${props=>props.height || ""};
    min-height: ${props=>props.minHeight || ""};
    max-height: ${props=>props.maxHeight || ""};
    max-width: ${props=>props.maxWidth || ""};
    min-width: ${props=>props.minWidth || ""};
    flex: ${props=>props.flex || "1 1 auto"};
    flex-direction: ${props=>props.flexDirection || "row"};
    justify-content: ${props=>props.justifyContent || "flex-start"};
    align-items: ${props=>props.alignItems || "flex-start"};
    align-self: ${props=>props.alignSelf || ""};
    align-content:${props=>props.alignContent || "flex-start"};
    flex-wrap: ${props=>props.flexWrap || ""};
    padding: ${props=>props.padding || ""};
    order: ${props=>props.order || ""};
    overflow-x: ${props=>props.overflowX || ""};
    overflow-y: ${props=>props.overflowY || ""};
    overflow: ${props=>props.overflow || ""};

    &>*:not(:last-child){
        margin:${props=>(props.flexDirection!=='column' && props.flexGap) && css`0 ${props.flexGap} 0 0`};
    }
    // margin:${props=>(props.flexDirection!=='column' && props.flexGap) && css`0 -${props.flexGap} 0 0`};

    &>*:not(:last-child){
        margin:${props=>(props.flexDirection==='column' && props.flexGap) && css`0 0 ${props.flexGap} 0`};
    }
    // margin:${props=>(props.flexDirection==='column' && props.flexGap) && css`0 0 -${props.flexGap} 0`};

    margin: ${props=>props.margin? props.margin+'!important':""};

    // css gap property integration
    gap: ${props=>props.gap || ""};

`;

export {FlexDiv};