import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Overview } from './index'
import { useOverview } from '@/hooks/useOverview'
import type { OverviewData } from '@/types'
import type { UseQueryResult } from '@tanstack/react-query'

vi.mock('@/components/LineChart', () => ({
  LineChart: () => <div data-testid="mock-line-chart">Line Chart</div>,
}))

vi.mock('@/components/StackedBarChart', () => ({
  StackedBarChart: () => <div data-testid="mock-stacked-chart">Stacked Chart</div>,
}))

vi.mock('@/hooks/useOverview', () => ({
  useOverview: vi.fn(),
}))

const mockData: OverviewData = {
  installs: [
    { day: 'monday', value: 100 },
    { day: 'tuesday', value: 150 },
  ],
  revenue: [
    { day: 'monday', value: 1000 },
    { day: 'tuesday', value: 1500 },
  ],
}

describe('Overview', () => {
  it('should render the loading state', () => {
    const mockQueryResult: Partial<UseQueryResult<OverviewData>> = {
      data: undefined,
      isLoading: true,
      isError: false,
    }

    vi.mocked(useOverview).mockReturnValue(mockQueryResult as UseQueryResult<OverviewData>)

    render(<Overview />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render the error state', () => {
    const mockQueryResult: Partial<UseQueryResult<OverviewData>> = {
      data: undefined,
      isLoading: false,
      isError: true,
    }

    vi.mocked(useOverview).mockReturnValue(mockQueryResult as UseQueryResult<OverviewData>)

    render(<Overview />)
    expect(screen.getByText('Oops, something went wrong. Please try again later.')).toBeInTheDocument()
  })

  it('should render the data correctly with default combined view', () => {
    const mockQueryResult: Partial<UseQueryResult<OverviewData>> = {
      data: mockData,
      isLoading: false,
      isError: false,
    }

    vi.mocked(useOverview).mockReturnValue(mockQueryResult as UseQueryResult<OverviewData>)

    render(<Overview />)
    
    expect(screen.getByTestId('mock-stacked-chart')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-line-chart')).not.toBeInTheDocument()
  })

  it('should switch between different chart types', () => {
    const mockQueryResult: Partial<UseQueryResult<OverviewData>> = {
      data: mockData,
      isLoading: false,
      isError: false,
    }

    vi.mocked(useOverview).mockReturnValue(mockQueryResult as UseQueryResult<OverviewData>)

    render(<Overview />)
    
    const select = screen.getByRole('combobox', {name: 'Select chart type'})
    
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Installs'))
    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-stacked-chart')).not.toBeInTheDocument()
    
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Revenue'))
    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-stacked-chart')).not.toBeInTheDocument()
    
    fireEvent.click(select)
    fireEvent.click(screen.getByText('Installs & Revenue'))
    expect(screen.getByTestId('mock-stacked-chart')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-line-chart')).not.toBeInTheDocument()
  })

  it('should toggle insights when clicking the insight button', () => {
    const mockQueryResult: Partial<UseQueryResult<OverviewData>> = {
      data: mockData,
      isLoading: false,
      isError: false,
    }

    vi.mocked(useOverview).mockReturnValue(mockQueryResult as UseQueryResult<OverviewData>)

    render(<Overview />)
    
    const insightButton = screen.getByRole('button', { name: /insights/i })
    fireEvent.click(insightButton)
    
    expect(screen.getByText('Revenue is highest on Fridays')).toBeInTheDocument()
    expect(screen.getByText('Weekend performance is lower')).toBeInTheDocument()
  })
}) 