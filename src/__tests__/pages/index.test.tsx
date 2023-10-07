import { screen, render } from '@testing-library/react';
import TopPage from 'src/pages';

describe('トップページ', () => {
  it('ページが表示されていること', () => {
    render(<TopPage />);

    expect(screen.getByText('トップページ')).toBeInTheDocument();
  });
});
