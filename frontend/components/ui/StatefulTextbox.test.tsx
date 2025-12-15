import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatefulTextbox } from './StatefulTextbox';

describe('StatefulTextbox', () => {
  test('renders with default border color when no status is provided', () => {
    render(<StatefulTextbox data-testid="textbox" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox).toHaveClass('border-gray-300');
  });

  test('renders with yellow border when status is "dirty"', () => {
    render(<StatefulTextbox data-testid="textbox" status="dirty" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox).toHaveClass('border-yellow-500');
  });

  test('renders with blue border when status is "saving"', () => {
    render(<StatefulTextbox data-testid="textbox" status="saving" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox).toHaveClass('border-blue-500');
  });

  test('renders with green border when status is "saved"', () => {
    render(<StatefulTextbox data-testid="textbox" status="saved" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox).toHaveClass('border-green-500');
  });

  test('renders as a textarea when as="textarea" is passed', () => {
    render(<StatefulTextbox data-testid="textbox" as="textarea" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox.tagName).toBe('TEXTAREA');
  });

  test('renders as an input by default', () => {
    render(<StatefulTextbox data-testid="textbox" />);
    const textbox = screen.getByTestId('textbox');
    expect(textbox.tagName).toBe('INPUT');
  });

  test('displays a label when a label is provided', () => {
    render(<StatefulTextbox label="Test Label" />);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  test('displays saving text when status is "saving"', () => {
    render(<StatefulTextbox status="saving" />);
    const savingText = screen.getByText('Saving...');
    expect(savingText).toBeInTheDocument();
  });

  test('displays saved text when status is "saved"', () => {
    render(<StatefulTextbox status="saved" />);
    const savedText = screen.getByText('Saved');
    expect(savedText).toBeInTheDocument();
  });

  test('displays unsaved changes text when status is "dirty"', () => {
    render(<StatefulTextbox status="dirty" />);
    const dirtyText = screen.getByText('Unsaved changes');
    expect(dirtyText).toBeInTheDocument();
  });
});
