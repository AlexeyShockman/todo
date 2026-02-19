import {Space, Tag, theme} from 'antd';
import {selectActiveTags, selectNotesData, toggleTag} from '../../store/notesSlice.ts';
import {useDispatch, useSelector} from 'react-redux';
import Title from 'antd/es/typography/Title';
import {useI18n} from '../../hooks/useI18n.ts';


export function TagsPanel () {

    const { token } = theme.useToken();
    const { t } = useI18n();
    const dispatch = useDispatch();

    const activeTags = useSelector(selectActiveTags);
    const { allTags } = useSelector(selectNotesData);


    if (allTags.length === 0) return null;


    return (
        <>
            <Title level={4}>{t.list.tagsPanelText}</Title>
            <Space.Compact style={{ flexWrap: 'wrap', marginBottom: 4, rowGap: 4 }}>
                {allTags.map((tag, i) => (
                    <Tag.CheckableTag
                        key={i}
                        checked={activeTags.includes(tag)}
                        onClick={() => dispatch(toggleTag(tag))}
                        style={{
                            border: `1px solid ${token.colorPrimary}`,
                            color: activeTags.includes(tag)
                                ? ''
                                : token.colorPrimary,
                            transition: 'all 0.2s',
                        }}
                    >
                        {tag}
                    </Tag.CheckableTag>
                ))}
            </Space.Compact>
        </>

    )
}