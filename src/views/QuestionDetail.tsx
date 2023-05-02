import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getQuestion, Question} from '../api/questions';
import {ToasterContext} from '../contexts/toast';
import CodeEditor from '@uiw/react-textarea-code-editor';
import {ErrorData, parseErrorMessage} from '../util';
import { Dropdown } from 'primereact/dropdown';
import {AxiosError} from 'axios';
import {Button} from 'primereact/button';
import {createSubmission} from '../api/submissions';

const programmingLanguages = [
    { name: 'python3', code: 'python'},
    { name: 'golang', code: 'go'},
    { name: 'nodejs', code: 'js'},
];
export default function() {
  const [question, setQuestion] = useState<Question>()
  const [language, setLanguage] = useState({ name: 'nodejs', code: 'js' })
  const [program, setProgram] = useState<any>({
    python: 'def main(input):\n    #code here',
    go: `func main(input interface{}) {\n// code here\n}
    `,
    js: 'function main(input) {\n// code here\n}'
  });
  const toast = useContext(ToasterContext)
  const {id} = useParams()

  const handleSubmission = async () => {
    console.log('hi')
    console.log(program[language.code])
    try {
      await createSubmission(id as string, {
        code: program[language.code],
        language: language.code,
      })
      toast.current?.show({
        summary: 'Submitted successully',
        detail: 'Do not go to other page',
        life: 5000,
        severity: 'success',
      })
    } catch (e: unknown) {
        toast.current?.show({
          summary: parseErrorMessage(e as AxiosError<ErrorData>),
          severity: 'error',
        })
      }
  }

  useEffect(() => {
     (async() => {
      try {
        const response = await getQuestion(id as string)
        const question = response.data
        setQuestion(question)
      } catch (e: unknown) {
        toast.current?.show({
          summary: parseErrorMessage(e as AxiosError<ErrorData>),
          severity: 'error',
        })
      }
    })()
  }, [id])
  return (
    <div className='flex flex-column p-2 gap-2'>
      <div className='flex flex-row-reverse justify-content-between'>
        <Dropdown className='' value={language} onChange={(e) => setLanguage(e.value)} options={programmingLanguages} optionLabel="name" />
        <h3>{question?.title}</h3>
      </div>
      <div className='flex gap-2'>
        <div className="w-6 surface-card p-4 shadow-2 border-round">
          <p>{question?.description}</p>
          <pre>{JSON.stringify(question?.testcases, null, 2)}</pre>
        </div>
        <div className='flex flex-column w-6 surface-card shadow-2 border-round'>
          <CodeEditor
            className='h-full text-lg'
            value={program[language.code]}
            onChange={(e) => {setProgram({...program, ...{[language.code]: e.target.value}})}}
            language={language.code}
            onInput={(e: any) => {setProgram((v: any) => ({...v, ...{[language.code]: e.target.value}}))}}
          />
        </div>
      </div>
      <div className='flex flex-row-reverse'>
        <Button onClick={handleSubmission}>Submit</Button>
      </div>
    </div>
  )
};

