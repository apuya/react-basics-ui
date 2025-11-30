import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FileInput } from './FileInput';

describe('FileInput', () => {
  it('renders with default props', () => {
    render(<FileInput />);
    const input = screen.getByRole('button');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<FileInput label="Upload file" />);
    expect(screen.getByText('Upload file')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<FileInput helperText="Max 5MB" />);
    expect(screen.getByText('Max 5MB')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<FileInput label="Upload" error helperText="File too large" />);
    const label = screen.getByText('Upload');
    expect(label).toHaveClass('text-[color:var(--component-input-label-error)]');
  });

  it('renders with custom upload text', () => {
    render(<FileInput uploadText="Drop your files here" />);
    expect(screen.getByText('Drop your files here')).toBeInTheDocument();
  });

  it('accepts file input', async () => {
    const handleFilesChange = vi.fn();
    render(<FileInput onFilesChange={handleFilesChange} />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, file);

    expect(handleFilesChange).toHaveBeenCalledWith([file]);
  });

  it('accepts multiple files', async () => {
    const handleFilesChange = vi.fn();
    render(<FileInput multiple onFilesChange={handleFilesChange} />);

    const files = [
      new File(['hello'], 'hello.png', { type: 'image/png' }),
      new File(['world'], 'world.png', { type: 'image/png' }),
    ];
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, files);

    expect(handleFilesChange).toHaveBeenCalledWith(files);
  });

  it('validates max file size', async () => {
    const handleError = vi.fn();
    const handleFilesChange = vi.fn();
    render(<FileInput maxSize={100} onError={handleError} onFilesChange={handleFilesChange} />);

    const file = new File(['a'.repeat(200)], 'large.txt', { type: 'text/plain' });
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, file);

    expect(handleError).toHaveBeenCalled();
    expect(handleFilesChange).not.toHaveBeenCalled();
  });

  it('validates max number of files', async () => {
    const handleError = vi.fn();
    const handleFilesChange = vi.fn();
    render(<FileInput multiple maxFiles={2} onError={handleError} onFilesChange={handleFilesChange} />);

    const files = [
      new File(['1'], '1.txt', { type: 'text/plain' }),
      new File(['2'], '2.txt', { type: 'text/plain' }),
      new File(['3'], '3.txt', { type: 'text/plain' }),
    ];
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, files);

    expect(handleError).toHaveBeenCalledWith('Maximum 2 files allowed');
    expect(handleFilesChange).not.toHaveBeenCalled();
  });

  it('displays file list when files are selected', async () => {
    render(<FileInput showFileList />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, file);

    expect(screen.getByText('hello.png')).toBeInTheDocument();
  });

  it('hides file list when showFileList is false', async () => {
    render(<FileInput showFileList={false} />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, file);

    expect(screen.queryByText('hello.png')).not.toBeInTheDocument();
  });

  it('removes file when remove button is clicked', async () => {
    const handleFilesChange = vi.fn();
    render(<FileInput showFileList onFilesChange={handleFilesChange} />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, file);
    expect(screen.getByText('hello.png')).toBeInTheDocument();

    const removeButton = screen.getByLabelText('Remove hello.png');
    await userEvent.click(removeButton);

    expect(screen.queryByText('hello.png')).not.toBeInTheDocument();
    expect(handleFilesChange).toHaveBeenLastCalledWith([]);
  });

  it('handles drag and drop', () => {
    const handleFilesChange = vi.fn();
    render(<FileInput onFilesChange={handleFilesChange} />);

    const dropzone = screen.getByRole('button');
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.dragEnter(dropzone, {
      dataTransfer: { files: [file] },
    });

    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    });

    expect(handleFilesChange).toHaveBeenCalledWith([file]);
  });

  it('applies disabled state', () => {
    render(<FileInput disabled />);
    const dropzone = screen.getByRole('button');
    expect(dropzone).toHaveAttribute('tabIndex', '-1');
  });

  it('applies base styling with container queries', () => {
    render(<FileInput />);
    const dropzone = screen.getByRole('button');
    expect(dropzone).toHaveClass('gap-3');
  });

  it('displays file size information', async () => {
    render(<FileInput showFileList />);

    const file = new File(['a'.repeat(1024)], 'test.txt', { type: 'text/plain' });
    const input = screen.getByRole('button').querySelector('input[type="file"]') as HTMLInputElement;

    await userEvent.upload(input, file);

    expect(screen.getByText('1 KB')).toBeInTheDocument();
  });

  it('supports custom upload icon', () => {
    render(<FileInput uploadIcon={<span data-testid="custom-icon">Icon</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('opens file picker on Enter key', async () => {
    const { container } = render(<FileInput />);
    const dropzone = screen.getByRole('button');
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    const clickSpy = vi.fn();
    input.click = clickSpy;

    dropzone.focus();
    await userEvent.keyboard('{Enter}');

    expect(clickSpy).toHaveBeenCalled();
  });

  it('opens file picker on Space key', async () => {
    const { container } = render(<FileInput />);
    const dropzone = screen.getByRole('button');
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;

    const clickSpy = vi.fn();
    input.click = clickSpy;

    dropzone.focus();
    await userEvent.keyboard('{ }');

    expect(clickSpy).toHaveBeenCalled();
  });

  it('accepts file types', () => {
    const { container } = render(<FileInput accept="image/*" />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toHaveAttribute('accept', 'image/*');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<FileInput ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
