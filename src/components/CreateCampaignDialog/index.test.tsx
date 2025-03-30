import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CreateCampaignDialog } from './index'

describe('CreateCampaignDialog', () => {
    const mockOnOpenChange = vi.fn()
    const mockOnSubmit = vi.fn()

    const defaultProps = {
        open: true,
        onOpenChange: mockOnOpenChange,
        onSubmit: mockOnSubmit,
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render the dialog when open is true', () => {
        render(<CreateCampaignDialog {...defaultProps} />)
        
        expect(screen.getByText('Create New Campaign')).toBeInTheDocument()
        expect(screen.getByLabelText('Campaign Name')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
    })

    it('should not render when open is false', () => {
        render(<CreateCampaignDialog {...defaultProps} open={false} />)
        
        expect(screen.queryByText('Create New Campaign')).not.toBeInTheDocument()
    })

    it('should handle input change and clear validation error', () => {
        render(<CreateCampaignDialog {...defaultProps} />)
        
        const input = screen.getByLabelText('Campaign Name')
        fireEvent.change(input, { target: { value: 'New Campaign' } })
        
        expect(input).toHaveValue('New Campaign')
    })

    it('should show validation error for duplicate campaign name', () => {
        const existingCampaigns = [{ name: 'Test Campaign' }]
        render(<CreateCampaignDialog {...defaultProps} existingCampaigns={existingCampaigns} />)
        
        const input = screen.getByLabelText('Campaign Name')
        fireEvent.change(input, { target: { value: 'Test Campaign' } })
        
        const createButton = screen.getByRole('button', { name: 'Create' })
        fireEvent.click(createButton)
        
        expect(screen.getByText('A campaign with this name already exists.')).toBeInTheDocument()
        expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('should show loading state when isLoading is true', () => {
        render(<CreateCampaignDialog {...defaultProps} isLoading={true} />)
        
        expect(screen.getByRole('button', { name: 'Creating...' })).toBeInTheDocument()
        expect(screen.getByLabelText('Campaign Name')).toBeDisabled()
    })

    it('should show error message when error prop is provided', () => {
        const error = new Error('Test error')
        render(<CreateCampaignDialog {...defaultProps} error={error} />)
        
        expect(screen.getByText('Oops, something went wrong. Please try again later.')).toBeInTheDocument()
    })

    it('should call onSubmit with campaign name when form is submitted', () => {
        render(<CreateCampaignDialog {...defaultProps} />)
        
        const input = screen.getByLabelText('Campaign Name')
        fireEvent.change(input, { target: { value: 'New Campaign' } })
        
        const createButton = screen.getByRole('button', { name: 'Create' })
        fireEvent.click(createButton)
        
        expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'New Campaign' })
    })

    it('should disable create button when input is empty', () => {
        render(<CreateCampaignDialog {...defaultProps} />)
        
        const createButton = screen.getByRole('button', { name: 'Create' })
        expect(createButton).toBeDisabled()
    })
}) 