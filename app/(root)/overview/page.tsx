import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserCount } from '@/lib/actions/user.actions';
import { formatNumber } from '@/lib/utils';

const OverviewPage = async () => {
  const summary = await getUserCount();
  return (
    <div className="space-y-2">
      <h1 className="h2-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Members Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-center">
              {/* Top row: Labels */}
              <div className="flex justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Members
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Active
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Not Active
                  </p>
                </div>
              </div>

              {/* Bottom row: Numbers */}
              <div className="flex justify-between mt-1">
                <div className="flex-1">
                  <p className="text-2xl font-bold">
                    {formatNumber(summary.total || 0)}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">
                    {formatNumber(summary.active || 0)}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">
                    {formatNumber((summary.total || 0) - (summary.active || 0))}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default OverviewPage;
