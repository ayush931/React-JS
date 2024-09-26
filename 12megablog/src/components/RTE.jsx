import React from 'react'
import { Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller
            name={name}
            control={control}
            render={({field: {onChange}}) => (
                <Editor
                    initialValue={defaultValue}
                    apiKey='your_api_key'
                    init={{
                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                            'table',
                            'paste wordcount',
                            'image',
                            'media',
                            'paste',
                            'codesample',
                            'quickbars',
                            'code',
                            'imageupload',
                            'codesample',
                            'quickbars',
                            'code',
                            'anchor'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | format',
                            content_style: "body { font-family:Helvetica, Arial, sans-serif; font-size: 14px }",
                            
                    }}
                    onEditorChange={onChange}
                />
            )}
        />
    </div>

  )
}
