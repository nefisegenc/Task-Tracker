import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../src/context/LanguageContext'
import TaskItem from '../src/components/TaskItem'

const Wrapper = ({ children }) => <LanguageProvider>{children}</LanguageProvider>

const sample = {
  id: 1,
  title: 'Test task',
  description: 'desc',
  priority: 'medium',
  category: 'other',
  completed: false,
  createdAt: new Date().toISOString()
}

test('renders title and description', () => {
  render(
    <Wrapper>
      <TaskItem task={sample} onToggle={() => { }} onEdit={() => { }} onDelete={() => { }} />
    </Wrapper>
  )
  expect(screen.getByText('Test task')).toBeInTheDocument()
  expect(screen.getByText('desc')).toBeInTheDocument()
})
