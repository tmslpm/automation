import { expect, test } from '@jest/globals';
import { ActionGithub } from '../src/ActionGithub';
import { ActionConfig } from '../src/ActionConfig';
import { Common } from '../src/Common';

test('test new ActionGithub(...): test creation from config json', () => {
    { // test with all field/property
        let cfg = {
            "id": "identifier-unique",
            "name": "task name",
            "description": "task description",
            "trigger": "workflow_dispatch",
            "runOn": "ubuntu-latest",
            "nodeVersion": "18.7.0"
        };

        expect(new ActionGithub(cfg).id).toBe(cfg.id);
        expect(new ActionGithub(cfg).name).toBe(cfg.name);
        expect(new ActionGithub(cfg).description).toBe(cfg.description);
        expect(new ActionGithub(cfg).trigger).toBe(cfg.trigger);
        expect(new ActionGithub(cfg).runOn).toBe(cfg.runOn);
        expect(new ActionGithub(cfg).nodeVersion).toBe(cfg.nodeVersion);

    }

    { // test with only required field/property
        let cfg = { "id": "identifier-unique" } as ActionConfig;
        expect(new ActionGithub(cfg).id).toBe(cfg.id);
        expect(new ActionGithub(cfg).name).toBe(cfg.id);
        expect(new ActionGithub(cfg).description).toBe(Common.ACTION_DEFAULT_DESCRIPTION);
        expect(new ActionGithub(cfg).trigger).toBe(Common.ACTION_DEFAULT_TRIGGER);
        expect(new ActionGithub(cfg).runOn).toBe(Common.ACTION_DEFAULT_PLATFORM_RUN_ON);
        expect(new ActionGithub(cfg).nodeVersion).toBe(Common.ACTION_DEFAULT_NODE_JS_VERSION);
    }

    { // test with without required field
        let cfg = {};
        expect(() => new ActionGithub(cfg as ActionConfig)).toThrow(/NullPointerException/);
        cfg = { "hello": "true" };
        expect(() => new ActionGithub(cfg as ActionConfig)).toThrow(/NullPointerException/);
        cfg = {
            "name": "task name",
            "description": "task description",
            "trigger": "workflow_dispatch",
            "runOn": "ubuntu-latest",
            "nodeVersion": "18.7.0"
        };
        expect(() => new ActionGithub(cfg as ActionConfig)).toThrow(/NullPointerException/);
    }

});

