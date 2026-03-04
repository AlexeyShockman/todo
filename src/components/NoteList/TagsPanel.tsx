import {Space, Tag, theme} from 'antd';
import {selectActiveTags, selectActiveSubTags, selectTags, toggleTag, toggleSubTag, clearAllSubTags} from '../../store/notesSlice.ts';
import {useDispatch, useSelector} from 'react-redux';
import Title from 'antd/es/typography/Title';
import {useI18n} from '../../hooks/useI18n.ts';


export function TagsPanel () {

    const { token } = theme.useToken();
    const { t } = useI18n();
    const dispatch = useDispatch();

    const activeTags = useSelector(selectActiveTags);
    const activeSubTags = useSelector(selectActiveSubTags);

    const { tags, subTags } = useSelector(selectTags);


    if (tags.length === 0) return null;


    return (
        <>
            <Title level={4}>{t.list.tagsPanelText}</Title>
            <Space.Compact style={{ flexWrap: 'wrap', marginBottom: 4, gap: 2 }}>
                {tags.map((tag, i) => (
                    <Tag.CheckableTag
                        key={i}
                        checked={activeTags.includes(tag)}
                        onClick={() => {
                            dispatch(clearAllSubTags());
                            dispatch(toggleTag(tag));
                        }}
                        style={{
                            border: `1px solid ${token.colorPrimary}`,
                            borderRadius: `0px`,
                            color: activeTags.includes(tag)
                                ? ''
                                : token.colorPrimary,
                            transition: 'all 0.2s',
                            margin: '0'
                        }}
                    >
                        {tag}
                    </Tag.CheckableTag>
                ))}
            </Space.Compact>
            {activeTags.length === 1 && subTags.length > 0 && (
                <>
                    <Title level={4}>{t.list.subTagsPanelText}</Title>
                    <Space.Compact style={{ flexWrap: 'wrap', marginBottom: 4, gap: 2 }}>
                        {subTags.map((subTag, i) => (
                            <Tag.CheckableTag
                                key={i}
                                checked={activeSubTags.includes(subTag)}
                                onClick={() => dispatch(toggleSubTag(subTag))}
                                style={{
                                    border: `1px solid orange`,
                                    borderRadius: `0px`,
                                    color: activeSubTags.includes(subTag) ? 'white' : 'orange',
                                    backgroundColor: activeSubTags.includes(subTag) ? 'orange' : 'transparent',
                                    transition: 'all 0.2s',
                                    margin: '0'
                                }}
                            >
                                {subTag}
                            </Tag.CheckableTag>
                        ))}
                    </Space.Compact>
                </>
            )}
        </>

    )
}