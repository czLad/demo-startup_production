import { render, screen } from '@testing-library/react';
import DashboardPage from '../page';

// Mock heavy subcomponents to prevent dependency errors
jest.mock('@/components/ClaimsPieChart', () => () => <div>Pie Chart</div>);
jest.mock('@/components/StatCard', () => (props) => <div>{props.title}</div>);
jest.mock('@/components/CasesTable', () => () => <div>Cases Table</div>);
jest.mock('@/components/CreateCaseForm', () => () => <div>Create Case Form</div>);
jest.mock('@/components/AICaseAssistant', () => () => <div>AI Assistant</div>);
jest.mock('@/components/CaseDetailsModal', () => () => <div>Case Details</div>);
jest.mock('@/components/CaseAnalysisModal', () => () => <div>Case Analysis</div>);
jest.mock('@/components/DashboardLayout', () => (props) => <div>{props.children}</div>);

test('renders dashboard with key sections', async () => {
  render(<DashboardPage />);
  
  // Check for key texts rendered by your StatCards
  expect(screen.getByText(/Active Claims/i)).toBeInTheDocument();
  expect(screen.getByText(/Denied/i)).toBeInTheDocument();
  expect(screen.getByText(/Approved/i)).toBeInTheDocument();
  

  // Check for major components (mocked)
  expect(screen.getByText(/Pie Chart/i)).toBeInTheDocument();
  expect(screen.getByText(/Cases Table/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Assistant/i)).toBeInTheDocument();
});
