import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../src/context/LanguageContext'
import TaskList from '../src/components/TaskList'

const Wrapper = ({ children }) => <LanguageProvider>{children}</LanguageProvider>

test('shows empty state when no tasks', () => {
  render(
    <Wrapper>
      <TaskList tasks={[]} onToggle={() => {}} onEdit={() => {}} onDelete={() => {}} />
    </Wrapper>
  )
  expect(screen.getByText(/görev bulunamadı|no tasks/i)).toBeInTheDocument()
})
