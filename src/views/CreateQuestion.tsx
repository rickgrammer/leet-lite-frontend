import { InputText } from 'primereact/inputtext';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { yupResolver } from '@hookform/resolvers/yup';
import {createQuestion, Difficulty, Question} from '../api/questions';
import {Button} from 'primereact/button';
import {useContext, useState} from 'react';
import {ToasterContext} from '../contexts/toast';
import {ErrorData, parseErrorMessage} from '../util';
import {AxiosError} from 'axios';

const difficulties = Object.entries(Difficulty).map(([k,v]) => ({label: k, value: v}))

export default function() {
  const toast = useContext(ToasterContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState({
    label: Difficulty.easy,
    value: Difficulty.easy
  })

  const [testcases, setTestcases] = useState(`[
    {
      "input": {},
      "output": {}
    }
  ]`)

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const question = {
      title,
      description,
      difficulty: difficulty.value,
      testcases: JSON.parse(testcases)
    }
    try {
      await createQuestion(question)
      toast.current?.show({
        summary: 'Question Created',
        severity: 'success'
      })
    } catch (e: unknown) {
      toast.current?.show({
        summary: parseErrorMessage(e as AxiosError<ErrorData>),
        severity: 'error',
      })
    }
    console.log(question)
  }

  return (
    <div>
      <form
      >
        <label htmlFor="title" className="block text-900 font-medium mb-2">Title</label>
        <InputText onChange={(e) => setTitle(e.target.value)} id="title" className="w-full mb-3"
        />
        <label htmlFor="description" className="block text-900 font-medium mb-2">description</label>
        <InputTextarea onChange={(e) => setDescription(e.target.value)} id="description" className="w-full mb-3"
        />
        <Dropdown className='' placeholder='Select difficulty' value={difficulty} options={difficulties} onChange={(e) => {setDifficulty(e.value); console.log(e)}}/>
        <p>Testcases</p>
          <CodeEditor
            className='text-lg'
            value={testcases}
            language="json"
            onInput={(e: any) => {setTestcases(e.target.value)}}
          />
        <Button className='mt-2' onClick={(e) => onSubmit(e)} type="submit" label="Create"/>
      </form>
    </div>
  )
}
