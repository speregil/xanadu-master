import { MasterRoutingModule } from './master-routing.module';

describe('MasterRoutingModule', () => {
  let masterRoutingModule: MasterRoutingModule;

  beforeEach(() => {
    masterRoutingModule = new MasterRoutingModule();
  });

  it('should create an instance', () => {
    expect(masterRoutingModule).toBeTruthy();
  });
});
