import { render, screen } from '@testing-library/react';
import DashboardPage from '../page';

// --- Mock subcomponents with display names to satisfy ESLint ---
jest.mock('@/components/ClaimsPieChart', () => {
  const MockClaimsPieChart = () => <div>Pie Chart</div>;
  MockClaimsPieChart.displayName = 'MockClaimsPieChart';
  return MockClaimsPieChart;
});

jest.mock('@/components/StatCard', () => {
  const MockStatCard = (props) => <div>{props.title}</div>;
  MockStatCard.displayName = 'MockStatCard';
  return MockStatCard;
});

jest.mock('@/components/CasesTable', () => {
  const MockCasesTable = () => <div>Cases Table</div>;
  MockCasesTable.displayName = 'MockCasesTable';
  return MockCasesTable;
});

jest.mock('@/components/CreateCaseForm', () => {
  const MockCreateCaseForm = () => <div>Create Case Form</div>;
  MockCreateCaseForm.displayName = 'MockCreateCaseForm';
  return MockCreateCaseForm;
});

jest.mock('@/components/AICaseAssistant', () => {
  const MockAICaseAssistant = () => <div>AI Assistant</div>;
  MockAICaseAssistant.displayName = 'MockAICaseAssistant';
  return MockAICaseAssistant;
});

jest.mock('@/components/CaseDetailsModal', () => {
  const MockCaseDetailsModal = () => <div>Case Details</div>;
  MockCaseDetailsModal.displayName = 'MockCaseDetailsModal';
  return MockCaseDetailsModal;
});

jest.mock('@/components/CaseAnalysisModal', () => {
  const MockCaseAnalysisModal = () => <div>Case Analysis</div>;
  MockCaseAnalysisModal.displayName = 'MockCaseAnalysisModal';
  return MockCaseAnalysisModal;
});

jest.mock('@/components/DashboardLayout', () => {
  const MockDashboardLayout = (props) => <div>{props.children}</div>;
  MockDashboardLayout.displayName = 'MockDashboardLayout';
  return MockDashboardLayout;
});

// --- Main test ---
test('renders dashboard with key sections', async () => {
  render(<DashboardPage />);
  
  // Key StatCard labels
  expect(screen.getByText(/Active Claims/i)).toBeInTheDocument();
  expect(screen.getByText(/Denied/i)).toBeInTheDocument();
  expect(screen.getByText(/Approved/i)).toBeInTheDocument();

  // Mocked core components
  expect(screen.getByText(/Pie Chart/i)).toBeInTheDocument();
  expect(screen.getByText(/Cases Table/i)).toBeInTheDocument();
  expect(screen.getByText(/AI Assistant/i)).toBeInTheDocument();
});
