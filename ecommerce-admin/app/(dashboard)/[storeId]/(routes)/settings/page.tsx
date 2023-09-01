interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

function SettingsPage({params}: SettingsPageProps): JSX.Element {
  return (
    <div>
      Settings Page
    </div>
  )
}

export default SettingsPage