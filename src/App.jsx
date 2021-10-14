import { FormatListBulleted, FormatListNumbered } from '@styled-icons/material'
import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createComboboxPlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHistoryPlugin,
  createItalicPlugin,
  createListPlugin,
  createMentionPlugin,
  createParagraphPlugin,
  createPlateComponents,
  createPlateOptions,
  createReactPlugin,
  createResetNodePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createTodoListPlugin,
  createUnderlinePlugin,
  ELEMENT_OL,
  ELEMENT_PARAGRAPH,
  ELEMENT_UL,
  getPlatePluginType,
  HeadingToolbar,
  MentionCombobox,
  Plate,
  ToolbarList,
  useEventEditorId,
  useStoreEditorRef,
} from '@udecode/plate'
import React from 'react'
import mentionables from './config/mentionables'
import { optionsExitBreakPlugin, optionsResetBlockTypePlugin, optionsSoftBreakPlugin } from './config/pluginOptions'

export default function App() {
  const components = createPlateComponents()
  const options = createPlateOptions()
  const plugins = [
    createReactPlugin(),
    createHistoryPlugin(),

    createParagraphPlugin(),
    // createBlockquotePlugin(),
    // createCodeBlockPlugin(),
    // createHeadingPlugin(),

    // createBoldPlugin(),
    // createItalicPlugin(),
    // createUnderlinePlugin(),
    // createStrikethroughPlugin(),
    // createCodePlugin(),

    // createComboboxPlugin(),
    // createMentionPlugin(),

    createTodoListPlugin(),
    createSoftBreakPlugin(optionsSoftBreakPlugin),
    createExitBreakPlugin(optionsExitBreakPlugin),
    createResetNodePlugin(optionsResetBlockTypePlugin),
    createListPlugin(),
  ]

  const editableProps = {
    placeholder: 'Type…',
    style: {
      padding: '15px',
    },
  }

  const initialValue = [
    {
      type: ELEMENT_PARAGRAPH,
      children: [
        {
          text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
        },
      ],
    },
  ]

  const plateProps = {
    id: 'test',
    initialValue,
    editableProps,
    options,
    plugins,
    components,
    onChange: () => console.log('test :>> '),
  }

  const Toolbar = () => {
    const editor = useStoreEditorRef(useEventEditorId('focus'))

    return (
      <>
        <ToolbarList type={getPlatePluginType(editor, ELEMENT_UL)} icon={<FormatListBulleted />} />
        <ToolbarList type={getPlatePluginType(editor, ELEMENT_OL)} icon={<FormatListNumbered />} />
      </>
    )
  }

  return (
    <>
      <HeadingToolbar>
        <Toolbar />
      </HeadingToolbar>
      <Plate {...plateProps}>
        <MentionCombobox items={mentionables} id="mention" trigger="@" searchPattern="[\S\s]*" />
        <MentionCombobox items={mentionables} id="mention2" trigger="#" />
      </Plate>
    </>
  )
}
