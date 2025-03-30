import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Campaigns } from './index'
import { useCampaigns } from '@/hooks/useCampaigns'
import { useCreateCampaign } from '@/hooks/useCreateCampaigns'
import type { Campaign, CreateCampaignInput } from '@/types'
import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query'

vi.mock('@/hooks/useCampaigns', () => ({
  useCampaigns: vi.fn(),
}))

vi.mock('@/hooks/useCreateCampaigns', () => ({
  useCreateCampaign: vi.fn(),
}))

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campaign 1',
    installs: [
      { day: 'monday', value: 100 },
      { day: 'tuesday', value: 150 },
    ],
  },
  {
    id: '2',
    name: 'Campaign 2',
    installs: [
      { day: 'monday', value: 200 },
      { day: 'tuesday', value: 250 },
    ],
  },
]

describe('Campaigns', () => {
  beforeEach(() => {
    localStorage.clear()

    const mockMutation: Partial<UseMutationResult<Campaign, Error, CreateCampaignInput>> = {
      mutate: vi.fn(),
      isPending: false,
      error: null,
    }
    vi.mocked(useCreateCampaign).mockReturnValue(mockMutation as UseMutationResult<Campaign, Error, CreateCampaignInput>)
  })

  it('should render the loading state', () => {
    const mockQueryResult: Partial<UseQueryResult<Campaign[]>> = {
      data: undefined,
      isLoading: true,
      isError: false,
    }

    vi.mocked(useCampaigns).mockReturnValue(mockQueryResult as UseQueryResult<Campaign[]>)

    render(<Campaigns />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render the error state', () => {
    const mockQueryResult: Partial<UseQueryResult<Campaign[]>> = {
      data: undefined,
      isLoading: false,
      isError: true,
    }

    vi.mocked(useCampaigns).mockReturnValue(mockQueryResult as UseQueryResult<Campaign[]>)

    render(<Campaigns />)
    expect(screen.getByText('Oops, something went wrong. Please try again later.')).toBeInTheDocument()
  })

  it('should render campaigns correctly', () => {
    const mockQueryResult: Partial<UseQueryResult<Campaign[]>> = {
      data: mockCampaigns,
      isLoading: false,
      isError: false,
    }

    vi.mocked(useCampaigns).mockReturnValue(mockQueryResult as UseQueryResult<Campaign[]>)

    render(<Campaigns />)

    expect(screen.getByText('Campaign: Campaign 1')).toBeInTheDocument()
    expect(screen.getByText('250')).toBeInTheDocument()
  })

  it('should switch between campaigns', () => {
    const mockQueryResult: Partial<UseQueryResult<Campaign[]>> = {
      data: mockCampaigns,
      isLoading: false,
      isError: false,
    }

    vi.mocked(useCampaigns).mockReturnValue(mockQueryResult as UseQueryResult<Campaign[]>)

    render(<Campaigns />)

    const selectTrigger = screen.getByRole('combobox', { name: 'Select campaign' })
    fireEvent.click(selectTrigger)

    const secondCampaign = screen.getByText('Campaign 2')
    fireEvent.click(secondCampaign)

    expect(screen.getByText('Campaign: Campaign 2')).toBeInTheDocument()
    expect(screen.getByText('450')).toBeInTheDocument()
  })

  it('should toggle insights when clicking the insight button', () => {
    const mockQueryResult: Partial<UseQueryResult<Campaign[]>> = {
      data: mockCampaigns,
      isLoading: false,
      isError: false,
    }

    vi.mocked(useCampaigns).mockReturnValue(mockQueryResult as UseQueryResult<Campaign[]>)

    render(<Campaigns />)

    const insightButton = screen.getByRole('button', { name: /insights/i })
    fireEvent.click(insightButton)

    expect(screen.getByText('Thursday shows the highest install rates across campaigns')).toBeInTheDocument()
    expect(screen.getByText('Campaign 2 outperforms others with peak performance of 78 installs')).toBeInTheDocument()
    expect(screen.getByText('Campaign 4 shows significantly lower performance (avg. 10 installs/day)')).toBeInTheDocument()
  })
}) 